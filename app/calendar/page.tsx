"use client";
import { EventAttributes, createEvent } from "ics";
import {useEffect, useState} from "react";

export default function Calendar() {
  // ダウンロード用URL
  const [url, setUrl] = useState("");

  // 初期化
  useEffect(() => {
    createCalenderEvent();
  });

  // カレンダーイベントを作成する。
  async function createCalenderEvent() {
    // イベントの情報
    const eventSource: EventAttributes = {
      title: "test",
      location: "name",
      start: [
        2024,
        9,
        2,
        10,
        0,
      ],
      duration: { hours: 2 },
    };

    // ファイルセット
    const filename = "calendar.ics";
    const event = await createEvent(eventSource).value;
    if (event !== undefined) {
      const file = new File([event], filename, { type: "text/calendar" });
      const url = URL.createObjectURL(file);
      setUrl(url);
    }
  }

  // ダウンロード処理
  function download() {
    const link = document.createElement("a");
    link.href = url;
    link.download = "calendar.ics";
    link.click();
  }

    return (
      <div className="px-9 py-7">
        <h3>Calendar</h3>
        <button onClick={() => download()}>Download</button>
      </div>
    );
  }