import { App, LogLevel } from "@slack/bolt";
import { WebClient } from "@slack/web-api";
import { AppRunner } from "@seratch_/bolt-http-runner";
import sendToSlack from "@/utils/sendToslack";
import { formatData } from "@/utils/TaskNotificationFormatter";
import cron from "node-cron";

export const appRunner = new AppRunner({
  logLevel: LogLevel.DEBUG,
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET as string,
});

const app = new App(appRunner.appOptions());

app.event("app_mention", async ({ say }) => {
  await say("yes");
});

const sendSlackMessage = async () => {
  try {
    const data = await sendToSlack();
    const web = new WebClient(process.env.SLACK_BOT_TOKEN);
    const formattedMessage = formatData(data);
    console.log(formattedMessage);
    await web.chat.postMessage({
      channel: "C05BC103SM60",
      text: formattedMessage,
    });

    console.log("Data sent to Slack");
  } catch (error) {
    console.error("Error sending data to Slack:", error);
  }
};
cron.schedule("5 * * * *", sendSlackMessage);

appRunner.setup(app);
