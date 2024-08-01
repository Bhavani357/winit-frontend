import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ClaimItems.css';
import { useNavigate } from 'react-router-dom';

const ClaimItems = () => {
    const navigate = useNavigate();
    const [isAddServiceClicked, setAddServiceClicked] = useState(false);
    const [claimItemsData, setClaimItemsData] = useState([]);
    const [formData, setFormData] = useState({
        claimId: 1, // You can adjust this based on your actual data
        expenseCategory: '',
        name: '',
        amount: '',
        startDate: '',
        endDate: ''
    });

    const handlePopUpToggle = () => {
        setAddServiceClicked(!isAddServiceClicked);
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        
        // Prepare the data for submission
        const payload = {
            claimId: formData.claimId,
            expenseCategory: formData.expenseCategory,
            name: formData.name,
            amount: parseFloat(formData.amount),
            startDate: formData.startDate,
            endDate: formData.endDate
        };
        console.log(payload)

        try {
            const response = await fetch('http://localhost:5000/api/v1/users/claimItem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                console.log('Service claim item added successfully');
                setAddServiceClicked(false);
                fetchClaimItems(); // Refresh the list after adding
            } else {
                console.error('Failed to add service claim item');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchClaimItems = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/v1/users/getClaimItems');
            console.log(response.data.claimItems)
            setClaimItemsData(response.data.claimItems);
        } catch (error) {
            console.error('Error fetching claim items:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/v1/users/deleteClaimItem/${id}`);
            if (response.status === 200) {
                console.log('Claim item deleted successfully');
                fetchClaimItems(); // Refresh the list after deletion
            } else {
                console.error('Failed to delete claim item');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchClaimItems();
    }, []);

    const handleBackToHome = ()=>{
        navigate('/')
    }

    const handleSaveClaims = ()=>{

    }

    return (
        <div>
            <div className='top-container'>
                <label htmlFor='claimDate'>Claim Date</label>
                <input type='text' id='claimDate'/>
                <label htmlFor='description'>Claim Description</label>
                <input type='text' id='description'/><br/>
                <label htmlFor='startDate'>Activity Start Date</label>
                <input type='date' id='startDate'/>
                <label htmlFor='endDate'>Acivity End Date</label>
                <input type='date' id='endDate'/><br/>
                <label htmlFor='claimtype'>ClaimType</label>
                <input type='text' id='claimtype'/><br/>
            </div>
            <div className='bottom-container'>
                <div className='add-service-claim-item'>
                    <p>Service Claim Items</p>
                    <button onClick={handlePopUpToggle}>Add Service Claim Item</button>
                </div>
                <hr />
                <table className='table-container'>
                    <thead>
                        <tr>
                            <th>S.NO</th>
                            <th>Expense Category</th>
                            <th>Name</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Expense Amount</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(claimItemsData) && claimItemsData.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.expenseCategory}</td>
                                <td>{item.name}</td>
                                <td>{item.startDate}</td>
                                <td>{item.endDate}</td>
                                <td>{item.amount}</td>
                                <td>
                                    <i 
                                        className="fas fa-trash-alt" 
                                        onClick={() => handleDelete(item.id)}
                                        style={{ cursor: 'pointer', color: 'red' }}
                                    ></i>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='buttons-container'>
                <button onClick={handleBackToHome}>Back</button>
                <button onClick={handleSaveClaims}>Save as Draft</button>
                <button>Submit For Approval</button>
            </div>
            {isAddServiceClicked && (
                <div className='modal-overlay' onClick={handlePopUpToggle}>
                    <div className='modal-content' onClick={e => e.stopPropagation()}>
                        <span className='close-button' onClick={handlePopUpToggle}>&times;</span>
                        <h3>New Service Claim Item</h3>
                        <hr />
                        <h3>Expense Category</h3>
                        <form onSubmit={handleFormSubmit}>
                            <input 
                                type='checkbox' 
                                id='expenseCategory' 
                                checked={formData.expenseCategory === 'travel'}
                                onChange={() => setFormData(prevData => ({
                                    ...prevData,
                                    expenseCategory: 'travel'
                                }))}
                            />
                            <label htmlFor='expenseCategory'>Travel</label>

                            <input 
                                type='checkbox' 
                                id='expenseCategory' 
                                checked={formData.expenseCategory === 'food'}
                                onChange={() => setFormData(prevData => ({
                                    ...prevData,
                                    expenseCategory: 'food'
                                }))}
                            />
                            <label htmlFor='expenseCategory'>Food</label>

                            <input 
                                type='checkbox' 
                                id='expenseCategory' 
                                checked={formData.expenseCategory === 'transportation'}
                                onChange={() => setFormData(prevData => ({
                                    ...prevData,
                                    expenseCategory: 'transportation'
                                }))}
                            />
                            <label htmlFor='expenseCategory'>Transportation</label><br/>

                            <input 
                                type='checkbox' 
                                id='expenseCategory' 
                                checked={formData.expenseCategory === 'venueBooking'}
                                onChange={() => setFormData(prevData => ({
                                    ...prevData,
                                    expenseCategory: 'venueBooking'
                                }))}
                            />
                            <label htmlFor='expenseCategory'>Venue Booking</label>

                            <input 
                                type='checkbox' 
                                id='expenseCategory' 
                                checked={formData.expenseCategory === 'miscellaneous'}
                                onChange={() => setFormData(prevData => ({
                                    ...prevData,
                                    expenseCategory: 'miscellaneous'
                                }))}
                            />
                            <label htmlFor='expenseCategory'>Miscellaneous</label><br/>

                            <label htmlFor='name'>Name</label><br/>
                            <input 
                                type='text' 
                                id='name' 
                                value={formData.name}
                                onChange={handleInputChange}
                            /><br/>

                            <label htmlFor='amount'>Expense Amount</label><br/>
                            <input 
                                type='number' 
                                id='amount' 
                                value={formData.amount}
                                onChange={handleInputChange}
                            /><br/>

                            <label htmlFor='startDate'>Start Date</label><br/>
                            <input 
                                type='date' 
                                id='startDate' 
                                value={formData.startDate}
                                onChange={handleInputChange}
                            /><br/>

                            <label htmlFor='endDate'>End Date</label><br/>
                            <input 
                                type='date' 
                                id='endDate' 
                                value={formData.endDate}
                                onChange={handleInputChange}
                            /><br/>

                            <button type='submit'>Add Service Claim</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClaimItems;
