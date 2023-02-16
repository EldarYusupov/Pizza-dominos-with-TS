import  {useCallback} from 'react';
import Categories from "../componentns/Categories.tsx";
import {Skeleton} from "../componentns/PizzaBlock/Skeleton.tsx";
import PizzaBlock from "../componentns/PizzaBlock/PizzaBlock.tsx";
import {useEffect} from "react";
import Pagination from "../componentns/Pagination/index.tsx";
import {useSelector} from "react-redux";
import {selectFilter, setCategoryId, setCurrentPage} from "../redux/slices/filter.ts"
import {fetchPizzas, selectPizzaData} from "../redux/slices/pizzaSlice.ts";
import {useAppDispatch} from "../redux/store.ts";
import SortPopup from "../componentns/Sort.tsx";
import {add} from "../utils/math.ts"

const Home:React.FC = () => {

    const dispatch = useAppDispatch()
    const {categoryId, sort, currentPage, searchValue} = useSelector(selectFilter)
    const {items, status} = useSelector(selectPizzaData)
    const sortType = sort.sortProperty

add(777, 888)

    const onChangeCategory = useCallback((id:number) => {
        dispatch(setCategoryId(id))
    }, [])

    const onChangePage = (number:number) => {
        dispatch(setCurrentPage(number))
    }


    useEffect(() => {
        const order = sortType.includes('-') ? 'asc' : 'desc'
        const sortBy = sortType.replace('-', '')
        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''

        async function fetchData() {

            dispatch(
                fetchPizzas(
                    {order, sortBy, category, search, currentPage:String(currentPage )}
                ))

        }

        fetchData()
        window.scrollTo(0, 0)
    }, [categoryId, sortType, searchValue, currentPage])


    const pizzas = items.map((obj:any) => <PizzaBlock  key={obj.id} {...obj} />)

    return (
        <div>
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
                <SortPopup value={sort}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {
                status === 'error' ?
                    <div className="content__error-info">
                        <h2>Произошла ошибка!
                            <icon>😕</icon>
                        </h2>
                        <p>
                            К сожалению не удалось получить питсы! Попробуйте повторить попытку позже!
                        </p>
                    </div>
                    :
                    <div className="content__items">
                        {
                            status === 'loading'
                                ? [...Array(6)].map((_, index) => <Skeleton key={index}/>)
                                : pizzas
                        }
                    </div>
            }

            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </div>
    );
};

export default Home;