import { reducerCases } from "./Constants";

//always write in camel case
export var initialState = {
    token:null,
    playlists:[],
    topItems:[],
    albums:[],
    podcasts:[],
    followedItems:[],
    currentTrack:null,
    selectedPlaylistId:null,
    selectedPlaylist:null,
    playerState:false,
    selectedArtistId:null,
    selectedAlbumId:null,
    selectedsearchTerm:"",
};
//"2K5JtuXb5hZGzKvMZFsdXf"
//"7Ln80lUS6He07XvHI8qqHH"
//"78bpIziExqiI9qztvNFlQu"
const reducer = (state, action)=>{
    switch (action.type){
        case reducerCases.SET_TOKEN:{
            return{
                ...state,
                token:action.token
            }
        }
        case reducerCases.SET_PLAYLISTS:{
            return {
                ...state, 
                playlists:action.playlists
            }
        }
        case reducerCases.SET_TOPITEMS:{
            return {
                ...state,
                topItems:action.topItems
            }
        }
        case reducerCases.SET_ALBUMS:{
            return{
                ...state,
                albums:action.albums
            }
        }
        case reducerCases.SET_PODCASTS:{
            return{
                ...state,
                podcasts:action.podcasts
            }

        }
        case reducerCases.SET_CURRENTTRACK:{
            return {
                ...state,
                currentTrack:action.currentTrack
            }
        }
        case reducerCases.SET_PLAYLIST:{
            return {
                ...state,
                selectedPlaylist:action.selectedPlaylist
            }
        }
        case reducerCases.SET_PLAYLIST_ID:{
            return{
                ...state,
                selectedPlaylistId:action.selectedPlaylistId
            }
        }
        case reducerCases.SET_ARTIST:{
            return{
                ...state,
                selectedArtist:action.selectedArtist
            }
        }
        case reducerCases.SET_ARTIST_ID:{
            return{
                ...state,
                selectedArtistId:action.selectedArtistId
            }
        }
        case reducerCases.SET_PLAYER_STATE:{
            return {
                ...state,
                playerState:action.playerState
            }
        }
        case reducerCases.SET_ALBUM_ID:{
            return {
                ...state,
                selectedAlbumId:action.selectedAlbumId
            }
        }
        case reducerCases.SET_SEARCH_TERM:{
            return{
                ...state,
                selectedsearchTerm:action.selectedsearchTerm
            }
        }
        case reducerCases.SET_FOLLOWED_ARTISTS:{
            return{
                ...state,
                followedItems:action.followedItems
            }
        }
        default:
            return state;
    }
};

export default reducer