---
toc_max_heading_level: 2
---

# Service Level Objective (SLO) Policy

We are committed to providing reliable, high-quality services to our customers. This Service Level Objective (SLO) outlines our availability commitments, incident response procedures, and the transparency measures we employ to keep you informed about the health of our services.

## Incident Classification & Response Times

| Severity | Definition | Response Time | Resolution Time | Communication |
|----------|------------|---------------|-----------------|---------------|
| **Severity 1 (Critical)** | Complete service outage or critical functionality unavailable affecting multiple customers | 30 minutes | 4 hours | Immediate notification via email |
| **Severity 2 (High)** | Significant degradation of service or critical functionality unavailable for a subset of customers | 1 hour | 8 hours | Notification via email upon resolution |
| **Severity 3 (Medium)** | Minor service degradation or non-critical functionality unavailable | 4 hours | 24 hours | As needed |
| **Severity 4 (Low)** | Cosmetic issues or minor bugs with workarounds available | 1 business day | Best effort | As needed |

## How We Catch Problems Fast

We've set up several systems to catch issues before you even notice them:

- **Real-time Monitoring**: Our systems watch critical endpoints 24/7 and alert us the moment something goes wrong
- **Automated Testing**: We regularly test authentication and pipeline workflows to catch issues before they affect you
- **Error Tracking**: We use tools like Sentry to get instant notifications when errors occur
- **Support Monitoring**: Our team watches support channels during business hours to catch issues you report

## Communication & Transparency

### When Things Go Wrong

Here's what you can expect from us during an incident:

1. **First Update** (within our response time)
   - We've found the problem and are working on it
   - How bad it is and who's affected
   - When you'll hear from us next
2. **Regular Updates** (every 2 hours for critical issues)
   - What's happening right now
   - What we're doing to fix it
   - Updated timeline if things change
3. **All Clear**
   - Everything is back to normal
   - Quick summary of what happened
   - We'll do a full review and share lessons learned

### After We Fix It

For serious incidents (Severity 1 & 2), we'll publish a full report within 5 business days that includes:

- **What Happened**: Step-by-step timeline of the incident
- **Who Was Affected**: How many customers and what services were impacted
- **Root Cause**: What actually caused the problem
- **How We'll Prevent It**: Specific steps we're taking to avoid this happening again
- **Lessons Learned**: What worked well and what we'll do better next time

## What's Not Covered

This SLO doesn't apply to:

- Beta or preview features (they're still experimental)
- Scheduled maintenance (we'll give you 72 hours notice)
- Issues outside our control (internet outages, AWS problems, etc.)
- Problems you caused (wrong configuration, hitting rate limits, etc.)
- Third-party service failures

## Need Help?

Here's how to reach us:

- **Support Portal**: [support.gruntwork.io](https://support.gruntwork.io) - Submit tickets and track issues
- **Email**: support@gruntwork.io - Direct email support
- **Slack**: Customer-specific channels (where available) - Real-time chat with our team
