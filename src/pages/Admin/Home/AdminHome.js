import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import Topbar from "../../../components/TopBar/Topbar";
import {AppProvider, Page, Card, Button, TopBar} from '@shopify/polaris';
import styles from './AdminHome.module.css';
import ReactPaginate from "react-paginate";

const AdminHome = props => {

    const [data, setData] = useState(
        [
            {Name: 'Ali'},
            {Name: 'Houssein'},
            {Name: 'Ahmad'}
        ]);

    const [customers, setCustomers] = useState([]);
    const [customerCount, setCustomerCount] = useState(0);
    const [items, setItems] = useState(0);
    const [avgUsers, setAvgUsers] = useState(0.0);
    const [duration, setDuration] = useState("");
    const [durationArr, setDurationArray] = useState(["last day", "last week", "last month", "last three months", "last year"])
    const [avgInfo, setAvgInfo] = useState("");
    const [currentPage, setCurrentPage] = useState(1)
    const [pageCount, setPageCount] = useState(1);

    const getCustomersApi = async () => {
        try {
            const result = await axios.post(`https://basmaku.herokuapp.com/api/user/get-all-users?page=${currentPage}`, {items: items})
            console.log(result.data);
            setCustomers(result.data.customers.data);
            await setCurrentPage(result.data.customers.current_page)
            setCustomerCount(result.data.customerNum);
            await setPageCount(result.data.customers.last_page);
            console.log(customerCount, customers);
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        axios.get(`https://basmaku.herokuapp.com/api/user/get-users-after-date?duration=${duration}`).then(result => {
            setAvgInfo(result.data.users);
        })
        getCustomersApi();
        console.log(currentPage);
    },[duration, currentPage])

    const handleClick = () => {
        console.log(data);
        if (data !== []) {
            data.map(item  => {
                return <div key={item}>
                    {item.Name}
                </div>
            });
        } else {
            return <div>No Data!</div>
        }

    }

    const handleItemsChange = (e) => {
        e.preventDefault();
        setItems(e.target.value);
    }

    const handleDurationChange = async (e) => {
            e.preventDefault();
            switch (e.target.value) {
                case "last day":
                    setDuration("d1");
                    break;
                case "last week":
                    setDuration("w1");
                    break;
                case "last month":
                    setDuration("m1");
                    break;
                case "last three months":
                    setDuration("m3");
                    break;
                case "last year":
                    setDuration("y1");
                    break;
            }
    }

    const handlePageClick = (e) => {
        setCurrentPage(e.selected + 1);
    }

    return (
        <div>
            <div className="mb-5">
                <label htmlFor="itemsPerPage">
                    <p className="mb-3">Enter number of customers per page</p>
                    <input name="itemsPerPage" id="itemsPerPage" type="number" className={styles.input_query} onChange={handleItemsChange}/>
                </label>
                <div className="mt-3">
                    <button onClick={getCustomersApi}>Get Customers</button>
                </div>
            </div>
            <div>
                {
                    (customerCount)
                        ? (
                            <div className={styles.customer_count}>
                                <h2 className={styles.customer_count__label}>Number of Customers: </h2>
                                <h2 className={styles.customer_count__content}>{customerCount}</h2>
                            </div>)
                        : null
                }
            </div>
            <table className="table">
                <thead>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                </thead>
                <tbody>
                    {
                        (customers.length > 0)
                            ? (customers.map(customer => {
                                return <tr>
                                    <td>{customer.name}</td>
                                    <td>{customer.email}</td>
                                </tr>
                            }))
                            : null
                    }
                </tbody>
            </table>
            <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={styles.pagination}
                subContainerClassName={styles.pagination}
                activeClassName={styles.active}/>

            <hr className={styles.hr} />
            <h1 className="h1 mb-5">
                Average API
            </h1>
            <h1>
                Choose the duration by which users registered
            </h1>
            <div>
                <select className={styles.select_query} name="duration" id="duration" onChange={handleDurationChange}>
                    <option value=""></option>
                {
                    durationArr.map(item => <option value={item}>{item}</option>
                    )
                }
                </select>
            </div>
            <div className={styles.average_users}>
                { avgInfo }
            </div>
        </div>
    );
};

AdminHome.propTypes = {

};

export default AdminHome;