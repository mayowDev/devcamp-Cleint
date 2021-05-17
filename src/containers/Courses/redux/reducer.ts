import {FETCH_COURSES, SET_COURSES_LOADER, SORT_COURSES, FETCH_COURSES_FAILED} from './constants'


const initialState = {
    courses: [],
    coursesLoading: true,
    canLoadMore: true,
    networkError: false,
    currentPage: 0,
    pages: {},
    sortBy: 'alphabetical',
}

export default(state = initialState, action) =>{
    switch (action.type) {
        case FETCH_COURSES_FAILED:
            return{
                ...state,
                courses:  [],
                networkError:true
            }
        case FETCH_COURSES:
            console.log('FETCH_COURSES reducer = ', action.payload);
            return {
                ...state,
                courses:  [...state.courses, ...action.payload],
                pages: action.payload.pagination,
                // currentPage: action.payload.pagination.currentPage?action.payload.pagination.currentPage:0,
                // canLoadMore: action.payload.page && action.payload.page.lastPage && action.payload.currentPage < action.payload.page.lastPage.index,
                coursesLoading: false,
            };

        case SORT_COURSES:
            console.log('SORT_COURSES = ', action.payload);
            return {...state, sortBy: action.payload};

        case SET_COURSES_LOADER:
            return {
                ...state,
                galleries: [],
                coursesLoading: true,
                canLoadMore: true,
                currentPage: 0,
                pages: {},
                sortBy: 'alphabetical',
                type: '',
            };

        default:
            return state;
    }
}

