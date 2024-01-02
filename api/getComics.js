import axios from 'axios';
import md5 from 'md5';
import ComicBook from '../models/comicBook.js';
import dotenv from 'dotenv'

dotenv.config()

const publicKey = process.env.PUBLIC_KEY
const privateKey = process.env.PRIVATE_KEY
const ts = new Date().getTime();
const hash = md5(ts + privateKey + publicKey);

function transformComicData(comicsRaw) {
    return comicsRaw.map(comic => {
        return {
            id: comic.id,
            title: comic.title,
            description: comic.description || 'No description available',
            thumbnailUrl: comic.thumbnail.path + '.' + comic.thumbnail.extension,
            issueNumber: comic.issueNumber,
            pageCount: comic.pageCount,
            resourceURI: comic.resourceURI
        };
    });
}

async function getComics() {
    await axios.get(`http://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}`)
        .then(response => {
            const comicsRaw = response.data.data.results
            const transformComics = transformComicData(comicsRaw)
            transformComics.forEach(async comicData => {
                const comic = new ComicBook(comicData)
                await comic.save()
            })
            console.log('Comics saved')
        })
        .catch(error => {
            console.error('Error:', error);
        })
}




getComics()


export default getComics
