import {req} from './test-helpers'
 import {db, DBtype, setDB} from '../src/db/db'
import {dataset1, video} from './dataset'
import {SETTINGS} from '../src/settings'


describe('/videos', () => {
     beforeAll(async () => { // очистка базы данных перед началом тестирования
         setDB()
     })

    it('should get empty array', async () => {

        const res = await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(200)

        console.log(res.body)

    })
    it('should get not empty array', async () => {
         setDB(dataset1)

        const res = await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(200)

        console.log(res.body)

    })
    it('should create videos with corect data', async () => {
        const video = {
            title: 'Video Title',
            author: 'Author Name',
            availableResolution: ['P144']
        };
        console.log(video);


        const res = await req
            .post(SETTINGS.PATH.VIDEOS)
            .send(video)
            .expect(201)

        expect(res.body).toEqual({
            title: video.title,
            author: video.author,
            availableResolution: video.availableResolution,
            id: expect.any(Number)
        })

    })

    it('should update video', async () => {
          const data = {title: 'update title', author: 'Author Name put'};

           setDB(dataset1)
           const videoId = db.videos[0].id
          await req
              .put(`/videos/${videoId}`)
              .send(data)
              .expect(204)
          await req
              .get(`/videos/${videoId}`)
              .expect(200, {
                  ...db.videos[0],
                  title: data.title,
              })
              console.log(db.videos[0])

    })
    it('find video by id', async () => {
        setDB(dataset1)
        console.log(db.videos)
        const videoId = db.videos[0].id

        const res = await req
            .get(`/videos/${videoId}`)
            .expect(200)

        console.log(res.body)
    })
    it('should delete video by id', async () => {
        setDB(dataset1)
        const videoId = db.videos[0].id
        console.log('Before deletion:', db.videos);
        await req
            .delete(`/videos/${videoId}`)
            .expect(204)
        console.log('After deletion:', db.videos);

        await req
            .get(`/videos/${videoId}`)
            .expect(404)
        await req
            .get('/videos')
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual({})
            })
    })

})