import {dataset1} from "../../__tests__/dataset";
import {OutputVideoType} from "../input-output/video-types";

export type DBtype = {
    videos: any[]
}

export const db: DBtype = {
    videos:[
    ]
}

export const setDB = (dataset?: Partial<DBtype>
) =>{
    if(!dataset){
        db.videos = []
        return
    }
    db.videos = dataset.videos || db.videos;

}
