import { useTranslation } from "next-i18next";
import * as React from "react";

import { useDayjs } from "../../utils/dayjs";
import DateCard from "../date-card";
import { ParticipantRowView } from "../poll/desktop-poll/participant-row";
import { ScoreSummary } from "../poll/score-summary";

const sidebarWidth = 180;
const columnWidth = 100;
const participants = [
  {
    name: "Reed",
    color: "bg-sky-400",
    votes: [0, 2],
  },
  {
    name: "Susan",
    color: "bg-blue-400",
    votes: [0, 1, 2],
  },
  {
    name: "Johnny",
    color: "bg-primary-400",
    votes: [2, 3],
  },
  {
    name: "Ben",
    color: "bg-purple-400",
    votes: [0, 1, 2, 3],
  },
];

const options = ["2022-03-14", "2022-03-15", "2022-03-16", "2022-03-17"];

const PollDemo: React.FunctionComponent = () => {
  const { t } = useTranslation("homepage");

  const { dayjs } = useDayjs();
  return (
    <div
      className="shadow-huge rounded-lg bg-white pb-2"
      style={{ width: 600 }}
    >
      <div className="flex">
        <div
          className="flex shrink-0 items-center py-2 pl-4 pr-2 font-medium"
          style={{ width: sidebarWidth }}
        >
          <div className="flex h-full grow items-end">
            {t("participantCount", { count: participants.length })}
          </div>
        </div>
        {options.map((option, i) => {
          const d = new Date(option);
          let score = 0;
          participants.forEach((participant) => {
            if (participant.votes.includes(i)) {
              score++;
            }
          });
          return (
            <div
              key={i}
              className="shrink-0 space-y-3 py-2 pt-3 text-center transition-colors"
              style={{ width: columnWidth }}
            >
              <div>
                <DateCard
                  day={dayjs(d).format("D")}
                  dow={dayjs(d).format("ddd")}
                  month={dayjs(d).format("MMM")}
                />
              </div>
              <div className="flex justify-center">
                <ScoreSummary yesScore={score} />
              </div>
            </div>
          );
        })}
      </div>
      {participants.map((participant, i) => (
        <ParticipantRowView
          key={i}
          color={participant.color}
          sidebarWidth={sidebarWidth}
          columnWidth={columnWidth}
          participantId={`participant${i}`}
          name={participant.name}
          votes={options.map((_, i) => {
            return participant.votes.some((vote) => vote === i) ? "yes" : "no";
          })}
        />
      ))}
    </div>
  );
};

export default PollDemo;
