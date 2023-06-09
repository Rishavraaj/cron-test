"use client";
import React, { useState } from "react";
import CustomLink from "@/components/CustomLink";
import sendSlackNotification from "@/api/slackapi";
import sendToSlack from "@/utils/sendToslack";
import { formatData } from "@/utils/TaskNotificationFormatter";

const Slack = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSendToSlack = async () => {
    setLoading(true);
    try {
      const data = await sendToSlack();
      const formatedData = formatData(data);
      sendSlackNotification(formatedData);
    } catch (error) {
      console.log("error while sending message to the slack");
    }
    setLoading(false);
  };

  return (
    <>
      <div className="flex items-center justify-around h-20">
        <button
          className="px-4 py-2 text-white uppercase bg-cyan-500 rounded-3xl"
          disabled={loading}
          onClick={handleSendToSlack}
        >
          send notification to slack
        </button>
        <CustomLink variant="button" href="/">
          Home
        </CustomLink>
      </div>
    </>
  );
};

export default Slack;
