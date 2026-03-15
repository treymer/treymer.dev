########################################
# Monitoring, Billing & Alerts
########################################

# SNS topic for alerts (must be in us-east-1 for CloudFront metrics)
resource "aws_sns_topic" "alerts" {
  provider = aws.us_east_1

  name = "treymer-dev-alerts"
}

resource "aws_sns_topic_subscription" "alerts_email" {
  provider = aws.us_east_1

  topic_arn = aws_sns_topic.alerts.arn
  protocol  = "email"
  endpoint  = var.alert_email
}

########################################
# Monthly Budget
########################################

resource "aws_budgets_budget" "monthly" {
  name         = "treymer-dev-monthly-budget"
  budget_type  = "COST"
  limit_amount = "5"
  limit_unit   = "USD"
  time_unit    = "MONTHLY"

  # 80% of budget ($4)
  notification {
    comparison_operator        = "GREATER_THAN"
    threshold                  = 80
    threshold_type             = "PERCENTAGE"
    notification_type          = "ACTUAL"
    subscriber_email_addresses = [var.alert_email]
  }

  # 100% of budget ($5)
  notification {
    comparison_operator        = "GREATER_THAN"
    threshold                  = 100
    threshold_type             = "PERCENTAGE"
    notification_type          = "ACTUAL"
    subscriber_email_addresses = [var.alert_email]
  }
}

########################################
# CloudFront Alarms (must be in us-east-1)
########################################

resource "aws_cloudwatch_metric_alarm" "cloudfront_5xx_error_rate" {
  provider = aws.us_east_1

  alarm_name          = "treymer-dev-cloudfront-errors"
  alarm_description   = "CloudFront 5xx error rate for treymer.dev exceeds 5%."
  namespace           = "AWS/CloudFront"
  metric_name         = "5xxErrorRate"
  statistic           = "Average"
  period              = 300
  evaluation_periods  = 2
  threshold           = 5
  comparison_operator = "GreaterThanThreshold"
  treat_missing_data  = "notBreaching"
  unit                = "Percent"

  dimensions = {
    DistributionId = aws_cloudfront_distribution.website.id
    Region         = "Global"
  }

  alarm_actions = [aws_sns_topic.alerts.arn]
}

resource "aws_cloudwatch_metric_alarm" "cloudfront_requests" {
  provider = aws.us_east_1

  alarm_name          = "treymer-dev-cloudfront-requests"
  alarm_description   = "CloudFront request volume for treymer.dev exceeds 10,000 requests in 5 minutes."
  namespace           = "AWS/CloudFront"
  metric_name         = "Requests"
  statistic           = "Sum"
  period              = 300
  evaluation_periods  = 2
  threshold           = 10000
  comparison_operator = "GreaterThanThreshold"
  treat_missing_data  = "notBreaching"
  unit                = "Count"

  dimensions = {
    DistributionId = aws_cloudfront_distribution.website.id
    Region         = "Global"
  }

  alarm_actions = [aws_sns_topic.alerts.arn]
}

# -----------------------------------------------
# Cost Anomaly Detection
# -----------------------------------------------

resource "aws_ce_anomaly_monitor" "overall" {
  name         = "treymer-dev-monitor"
  monitor_type = "DIMENSIONAL"
  monitor_dimension = "SERVICE"
}

resource "aws_ce_anomaly_subscription" "alerts" {
  name      = "treymer-dev-anomaly-alert"
  frequency = "IMMEDIATE"

  monitor_arn_list = [
    aws_ce_anomaly_monitor.overall.arn
  ]

  subscriber {
    type    = "SNS"
    address = aws_sns_topic.alerts.arn
  }

  threshold_expression {
    dimension {
      key           = "ANOMALY_TOTAL_IMPACT_ABSOLUTE"
      values        = ["5"]
      match_options = ["GREATER_THAN_OR_EQUAL"]
    }
  }
}