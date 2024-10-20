"use client";
import {useState, useEffect} from "react";
import Link from "next/link";

type Lyric = {
    アーティスト: string,
    曲名: string,
    歌詞: string,
    作詞: string,
    作曲: string
}

const SearchSong = ({Lyrics}:{Lyrics:Lyric[]}) => {

    const [input, setInput] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    const [titles, setTitles] = useState<string[]>([])
    const [lyric, setLyric] = useState<string[]>([])
    const [suggestions, setSuggestions] = useState<string[]>([])

    const searchLyric = () => {
        console.log(input)
        const searched = Lyrics.find((Lyric) => {
            return Lyric["曲名"] === input
        })
        setTitle(searched["曲名"])
        setLyric(searched["歌詞"].split("\n"))
    }

    useEffect(() => {
        if (input.length === 0){
            setSuggestions([])
        } else {
            const sugg = titles.filter((title) => title.toUpperCase().startsWith(input.toUpperCase()) && title.toUpperCase() != input.toUpperCase())
            setSuggestions(sugg)
        }
    }, [input])

    useEffect(() => {
        console.log(suggestions)
    }, [suggestions])    

    useEffect(() => {
        const ts = Lyrics.map((Lyric) => {
            return Lyric["曲名"]
        })
        setTitles(ts)
    }, [])


    return (
        <div className="bg-background text-foreground w-full h-full">
        <div className="h-screen md:flex">
            <div className="flex flex-col md:w-1/4">
            <p className="py-5 font-bold text-xl">Mr.Children　歌詞検索</p>
            <label className="w-full mb-2 text-sm font-medium text-gray-900 dark:text-white">曲名で検索</label>
            <input value={input} onChange={(event) => setInput(event.target.value)} type="text" id="title" className="w-full py-2 border-2 rounded-sm md:w-full" placeholder="曲名" required />
            <ul className="absolute z-10 mt-16 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
            {suggestions.map((suggestion) => {
                return (
                <li className="cursor-pointer" onClick={(event) => {setInput(suggestion)}}>{suggestion}</li>
                )})}
            </ul>

            <button className="w-1/3 mt-2 ml-auto px-2 border-2 rounded-lg border-gray-800 bg-gray-100 font-semibold opacity-60 group-hover:opacity-100 mb-1" onClick={searchLyric}>検索</button>

            </div>
            <div className="px-20 md:w-3/4 mt-5">
            <h3>{title}</h3>
            <br/>
            {lyric.map((l) => <p>{l}</p>)}
            </div>
        </div>
        </div>
    )
}

export default SearchSong;

/*
    return (
        <div className="w-full">
            <label className="w-full block mb-2 text-sm font-medium text-gray-900 dark:text-white">曲名で検索</label>
            <div className="flex min-w-[512px]">
            <input className="flex-1" value={input} onChange={(event) => setInput(event.target.value)} type="text" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="曲名" required />
            <button className="flex-auto px-4 py-2 bg-blue-500 text-white font-semibold rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" onClick={searchLyric}>search</button>
            </div>
            <ul className="absolute z-10 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
            {suggestions.map((suggestion) => {
                return (
                <li className="cursor-pointer" onClick={(event) => {setInput(suggestion)}}>{suggestion}</li>
                )})}
            </ul>
            <br/>
            <h3 className="w-128">{title}</h3>
            <br/>
            {lyric.map((l) => <p className="w-128">{l}</p>)}
    
        </div>
    )
*/