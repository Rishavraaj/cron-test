import axios from "axios";

const slackChannelUrl  = process.env.NEXT_PUBLIC_ASANA_TESTING_CHANNEL_WEBHOOK_URL || ""

const sendSlackNotification = async (message: string) => {
  
  try {
    const data = {
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: message,
          },
        },
      ],
    };

    const response = await axios.post(slackChannelUrl, JSON.stringify(data), {
      withCredentials: false,
      transformRequest: [(data) => data],
    });

    if (response.status === 200) {
      console.log("Data sent to Slack channel.");
    } else {
      throw new Error("Failed to send data to Slack channel.");
    }
  } catch (error) {
    console.error("Error sending data to Slack channel:", error);
  }
};

export default sendSlackNotification;
