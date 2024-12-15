import {db} from "../db/db";
import {OutputVideoType} from "../input-output/video-types";
import {Response, Request} from "express";


export const getVideoController = (req: Request, res:Response<OutputVideoType[]>) => {
    const videos = db.videos
    res.sendStatus(200).json(videos)
}
export const getVideoByIdController = (req: Request, res: Response) => {
    let foundVideo = db.videos.find((video) => video.id === +req.params.id)
    if (!foundVideo) {
        res.status(404).send('No video with id ' + +req.params.id)
    }else{
        res.json(foundVideo)
    }
}