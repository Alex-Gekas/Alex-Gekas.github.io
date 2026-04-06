---
title: Send Task Updates from an API to Slack Using Webhooks
description: How to connect the Task API to Slack using a webhook and Python scripts to receive daily task update notifications.
---
!!! abstract "About this sample"
    - **What this is:** A step-by-step tutorial for connecting the Task API to Slack using an incoming webhook—covers three Python notification scripts and cron scheduling, written as a published developer article.
    - **Audience:** Developers and DevOps engineers.
    - **Tools used:** MkDocs, Markdown, Slack Webhooks API, Python, cron.
    - **What it demonstrates:** How to write a tutorial that gives developers enough context to understand what they're doing, while staying out of the way of actually doing it.  
    - **Behind the docs:** [Read the case study →](index.md)

# Send Task Updates from an API to Slack Using Webhooks

## Introduction

Many SaaS applications send notifications to Slack when important events occur. Instead of checking dashboards throughout the day, updates can appear directly in a Slack message. While documenting a small Task API that I recently built, I started wondering whether it could be integrated with Slack to send task updates. I decided to connect the Task API to Slack using a webhook.

In this guide, I will show you how I set up this integration and give step-by-step instructions to create the webhook in Slack, integrate it into your Python scripts, and set the scripts to run automatically to generate daily DM updates from the Task API. This guide will give you a solid foundation for integrating Slack with a third-party API. You can apply the concepts you learned to more complex integrations.

## Getting Started

Once I connected the two apps, I built three Python scripts to scan the Task API for different task statuses: incomplete tasks (pending or in progress), incomplete tasks past their deadline, and completed tasks. Each script posts a message to the Slack webhook, triggering a notification in the Slack DM channel. After testing the scripts, I installed them on my server and set them to query the Task API on a set schedule, giving me a daily DM in Slack to stay updated on my tasks.

To follow along, you will need:

- Python installed
- A Slack workspace
- An API token for the Task API

**What you will build:**

- A Slack app with a webhook to integrate into your code to receive and post messages to the Slack DM channel.
- Three Python scripts that send reminders about your tasks from the Task API to your Slack DM.

## Create a Slack Webhook

To connect the Task API to Slack, you need to create an app with a webhook in Slack to receive notifications. A Slack webhook is a URL that allows external applications to post messages to Slack. For more detail on how Slack webhooks work, see the [official Slack documentation](https://api.slack.com/messaging/webhooks).

1. Go to [api.slack.com/apps](https://api.slack.com/apps) and click **Create New App**.
2. Select **From scratch**, enter an app name, and choose the workspace you want to connect to.
3. From the app settings page, select **Incoming Webhooks** in the left sidebar.
4. Toggle **Activate Incoming Webhooks** to on.
5. Click **Add New Webhook to Workspace** at the bottom of the page.
6. Select the channel or DM you want the webhook to post to and click **Allow**.
7. Copy the webhook URL that appears — it will look like `https://hooks.slack.com/services/T00/B00/xxx`.

!!! note
    Your actual webhook will display a unique code instead of the `xxx` shown above.

## Query the Task API

The Task API stores all of your personal tasks with their statuses and due dates. To complete the steps below, you need to set up a user account in the Task API and generate a token. You also need to have one task in `pending` or `in_progress` status, one in `completed` status, and one overdue task. For a full reference on creating an account and setting up tasks in the Task API, see the [documentation here](../task-api-docs/setup.md).

Make a `GET` request to retrieve all fields associated with your tasks:
```bash
curl -X GET "http://your-server-address:3000/api/tasks" \
  -H "Authorization: Bearer your-api-key-here"
```

Your API key is your JWT — the unique token associated with your account. The API returns all tasks associated with your token:
```json
{
  "tasks": [
    {
      "id": "task_001",
      "title": "Update API documentation",
      "status": "pending",
      "due_date": "2024-03-20",
      "priority": "high"
    },
    {
      "id": "task_002",
      "title": "Review pull request",
      "status": "in_progress",
      "due_date": "2024-03-22",
      "priority": "medium"
    },
    {
      "id": "task_003",
      "title": "Fix login bug",
      "status": "completed",
      "due_date": "2024-03-18",
      "priority": "high"
    }
  ]
}
```

The scripts scan three fields from the API response to determine what to post in the Slack DM:

| Field | Type | Description |
|---|---|---|
| `title` | string | The name of the task |
| `status` | string | The task status: `pending`, `in_progress`, or `completed` |
| `due_date` | string | The task deadline in ISO 8601 format, for example `2024-12-31` |

## Connect the Task API and Slack

You now have a webhook that connects Slack and the Task API. They can communicate, but you need scripts to query the Task API and post the results to Slack.

First, run a test script to make sure your Slack webhook works. Replace the placeholder webhook URL with your own and run it from your command line or server:
```python
import requests

SLACK_WEBHOOK = "https://hooks.slack.com/services/xxx/xxx/xxx"

payload = {"text": "Webhook test successful!"}
response = requests.post(SLACK_WEBHOOK, json=payload)

if response.status_code == 200:
    print("Message sent successfully")
else:
    print(f"Failed to send message. Status code: {response.status_code}")
```

If you get `Message sent successfully` and a DM appears in Slack, your webhook URL is configured correctly. If nothing happens, check that you replaced the placeholder URL with your actual webhook URL.

Next, query the `/tasks` endpoint and evaluate the response fields. Each script sends a different DM with one of the following notifications: **Incomplete Tasks**, **Overdue Tasks**, and **Completed Tasks**.

### Incomplete Tasks
```python
import requests

TOKEN = "your-api-key-here"
SLACK_WEBHOOK = "https://hooks.slack.com/services/xxx/xxx/xxx"
API_URL = "http://your-server-address:3000/api/tasks"

response = requests.get(
    f"{API_URL}?status=pending,in_progress",
    headers={"Authorization": f"Bearer {TOKEN}"}
)
tasks = response.json()["tasks"]

incomplete = [
    f"🔵 {task['title']} -- {task['status']}"
    for task in tasks
]

if incomplete:
    message = "📋 *Incomplete Tasks:*\n" + "\n".join(incomplete)
    requests.post(SLACK_WEBHOOK, json={"text": message})
```

This script queries the `/tasks` endpoint and scans the response for tasks with a status of `pending` or `in_progress`. It then posts an **Incomplete Tasks** notification with a list of task titles to the Slack webhook.

### Overdue Tasks
```python
import requests
from datetime import date

TOKEN = "your-api-key-here"
SLACK_WEBHOOK = "https://hooks.slack.com/services/xxx/xxx/xxx"
API_URL = "http://your-server-address:3000/api/tasks"

response = requests.get(
    f"{API_URL}?status=pending",
    headers={"Authorization": f"Bearer {TOKEN}"}
)
tasks = response.json()["tasks"]
today = date.today()

overdue = [
    f"⚠️ {task['title']} -- due {task['due_date']}"
    for task in tasks
    if task["due_date"] and date.fromisoformat(task["due_date"]) < today
]

if overdue:
    message = "🔴 *Overdue Tasks:*\n" + "\n".join(overdue)
    requests.post(SLACK_WEBHOOK, json={"text": message})
```

This script looks for tasks that have a `pending` status and a `due_date` in the past. It then posts an **Overdue Tasks** notification containing a list of task titles and their due dates.

### Completed Tasks
```python
import requests

TOKEN = "your-api-key-here"
SLACK_WEBHOOK = "https://hooks.slack.com/services/xxx/xxx/xxx"
API_URL = "http://your-server-address:3000/api/tasks"

response = requests.get(
    f"{API_URL}?status=completed",
    headers={"Authorization": f"Bearer {TOKEN}"}
)
tasks = response.json()["tasks"]

completed = [
    f"✅ {task['title']}"
    for task in tasks
]

if completed:
    message = "🟢 *Completed Tasks:*\n" + "\n".join(completed)
    requests.post(SLACK_WEBHOOK, json={"text": message})
```

This script scans for any task with a status of `completed` and sends a **Completed Tasks** message to the webhook.

## Schedule Automatic Notifications

You can configure these scripts to run automatically so you never miss a task update or deadline. To schedule a script on a Linux server, open your crontab file:
```bash
crontab -e
```

Add a line specifying when and how often to run the script. For example, to run the overdue tasks script every day at 8am:
```bash
0 8 * * * python3 /path/to/overdue_tasks.py
```

## Conclusion

You have now built three scripts that query the Task API and send Slack DMs using a webhook. Scheduling these scripts to run on a cron job will ensure that you receive reminder messages and stay up to date with your tasks. You now understand how to use webhooks to integrate third-party apps into Slack. You can build on what you've learned in this guide to:

- Extend the existing scripts to filter tasks by priority and route notifications to different Slack channels.
- Configure the Task API to send a DM the moment a task is updated, removing the need for a scheduled cron job.