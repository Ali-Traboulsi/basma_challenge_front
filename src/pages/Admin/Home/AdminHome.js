import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import Topbar from "../../../components/TopBar/Topbar";
import {AppProvider, Page, Card, Button, TopBar} from '@shopify/polaris';
import styles from './AdminHome.module.css';

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
    const [durationArr, setDurationArray] = useState(["d1", "w1", "m1", "m3", "y1"])
    const [avgInfo, setAvgInfo] = useState("");

    const getCustomersApi = async () => {
        try {
            const result = await axios.get(`http://localhost:8000/api/user/get-all-users?items=${items}`)
            console.log(result.data);
            setCustomers(result.data.customers.data);
            setCustomerCount(result.data.customerNum);
            console.log(customerCount, customers);
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/get-users-after-date?duration=${duration}`).then(result => {
            setAvgInfo(result.data.users);
        })
    },[duration])

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
            setDuration(e.target.value)
    }

    return (
        <div>
            <button onClick={getCustomersApi}>Get Customers</button>
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
            <div>
                <input type="number" className={styles.input_query} onChange={handleItemsChange}/>
            </div>
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