"use client";
import React, {useState, useEffect} from "react";
import Link from "next/link";

type Lyric = {
    アーティスト: string,
    曲名: string,
    歌詞: string,
    作詞: string,
    作曲: string
}

const QuizLyric = ({Lyrics}:{Lyrics:Lyric[]}) => {

    const [title, setTitle] = useState<string>("")
    const [titles, setTitles] = useState<string[]>([])
    const [lyric, setLyric] = useState<string[]>([])
    const [lyric2, setLyric2] = useState([])
    const [row, setRow] = useState<number>(0)
    const [phrase, setPhrase] = useState<string>("")
    const [status, setStatus] = useState<boolean>(false)

    const newTitleList = () => {
        const newTitles = titles.filter((item) => item !== title)
        setTitles(newTitles)
    }

    const chooseSong = () => {
        if (titles.length == 0){
            return
        } else {
            const randomIndex = Math.floor(Math.random() * titles.length);
            const choosedSong = titles[randomIndex]
            setTitle(choosedSong)
            const choosed = Lyrics.find((Lyric) => {
                return Lyric["曲名"] === choosedSong
            })
            setLyric(choosed["歌詞"].split("\n"))
            setStatus(false)
        }
    }

    const createLyric = (n) => {
        let l = lyric;
        const l2 = l.map((item, index) => {
          if (index === n ){
            return (
              <React.Fragment><div className="text-blue-600 font-bold text-center">{item}<br/></div></React.Fragment>
            );
          } else {
            return (
              <React.Fragment><div className="text-center">{item}<br/></div></React.Fragment>
            );       
          }
        })
        setLyric2(l2);
      }
    

    const choosePhrase = () => {
        const n = lyric.length
        const randomIndex = Math.floor(Math.random() * n);
        const phrase = lyric[randomIndex]
        setRow(randomIndex)
        console.log(phrase)
        setPhrase(phrase)
    }

    useEffect(() => {
        const ts = Lyrics.map((Lyric) => {
            return Lyric["曲名"]
        })
        setTitles(ts)
    }, [])

    useEffect(() => {
        chooseSong()
    }, [titles])

    useEffect(() => {
        choosePhrase()
        console.log("歌詞がセットされました")
    }, [lyric])

    useEffect(() => {
        console.log(phrase)
    }, [phrase])

    useEffect(() => {
        console.log(status)
    }, [status])

    useEffect(() => {
        createLyric(row) 
    }, [row])

    return (
        <div className="bg-background text-foreground w-full h-full">
        <div className="h-screen md:flex">
            <div className="w-full md:w-1/4 flex flex-col ">
                <div className="text-center font-bold text-xl mt-1 mb-2">Mr.Children歌詞クイズ</div>
                <button className="px-2 py-2 border-1 rounded-lg border-gray-800 bg-gray-300 font-semibold mb-1" onClick={newTitleList}>次の曲</button>
                <div className="flex">
                <button className="w-1/4 px-2 mr-1 text-sm border-1 rounded-lg border-gray-800 bg-gray-100 mb-1 mt-10" onClick={()=>setPhrase(lyric[row+1])}>直後歌詞</button>
                <button className="w-1/4 px-2 text-sm border-1 rounded-lg border-gray-800 bg-gray-100 mb-1 mt-10" onClick={()=>setPhrase(lyric[0])}>歌い出し</button>
                <button className="w-2/5 border-2 rounded-lg border-sky-800 bg-sky-200 font-semibold mb-1 mt-10 ml-auto" onClick={() => setStatus(true)}>正解</button>
                </div>
                <Link href="/lyric_game/search" className="w-1/2 text-sm border-1 rounded-lg border-lime-800 bg-lime-300 text-center mb-1 mt-5 ml-auto">歌詞検索ページ</Link>
            </div>
            <div className="overflow-y-auto px-20 md:w-3/4">
                {status ? (
                <div>
                <p className="mt-8 mb-8 font-bold text-xl text-center md:mt-1">{title}</p>
                <p>{lyric2}</p>
                </div>
                ):(
                <div>
                <p className="mt-8 mb-8 font-bold text-xl text-center md:mt-1">{phrase}</p>
                </div>
                )}
            </div>
        </div>
        </div>
    )
}

export default QuizLyric;

/*
        <div className="bg-background text-foreground w-full h-full">
        <div className="h-screen flex">
            <div className="flex flex-col w-32 md:w-1/4">
                <button className="px-2 border-2 border-gray-800 bg-gray-100 font-semibold opacity-60 group-hover:opacity-100 mb-1" onClick={chooseSong}>次の曲</button>
                <div className="px2 mt-10">ヒント</div>
                <button className="px-2 border-2 border-gray-400 bg-gray-100 font-semibold opacity-60 group-hover:opacity-100 mb-1" onClick={()=>setPhrase(lyric[row+1])}>直後のフレーズ</button>
                <button className="px-2 border-2 border-gray-400 bg-gray-100 font-semibold opacity-60 group-hover:opacity-100 mb-1" onClick={()=>setPhrase(lyric[0])}>歌い出し</button>
                <button className="px-2 mt-10 border-2 border-sky-800 bg-sky-500 font-semibold opacity-60 group-hover:opacity-100 mb-1" onClick={() => setStatus(true)}>曲名は？</button>
                <Link href="/lyric_game/search" className="px-2 mt-36 text-center border-2 border-lime-600 bg-lime-300 font-semibold opacity-60 group-hover:opacity-100 mb-1">歌詞検索</Link>
            </div>
            <div className="overflow-y-auto px-20 md:w-3/4">
                {status ? (
                <div>
                <p className="mb-8 font-bold text-xl text-center">{title}</p>
                <p>{lyric2}</p>
                </div>
                ):(
                <div>
                <p className="mb-8 font-bold text-xl text-center">{phrase}</p>
                </div>
                )}
            </div>
        </div>
        </div>
*/