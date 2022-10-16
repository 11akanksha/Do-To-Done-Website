import React, { useState, useEffect } from 'react';
import "../App.css";


const getLocalItems = () => {
    let list = localStorage.getItem('list');

    if (list) {
        return JSON.parse(list);
    } else {
        return [];
    }
}
const Todo = () => {
    const [inputData, setInputData] = useState('');
    const [item, setItem] = useState(getLocalItems());
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [isEditItem, setIsEditItem] = useState(null);

    const addItem = () => {
        if (!inputData) {
            alert("Please fill the data");
        } else if (inputData && !toggleSubmit) {
            setItem(
                item.map((elem) => {
                    if (elem.id === isEditItem) {
                        return { ...elem, name: inputData }
                    }
                    return elem;
                })
            )
            setToggleSubmit(true);
            setInputData('');
            setIsEditItem(null);
        } else {
            const allInputData = { id: new Date().getTime().toString(), name: inputData }
            setItem([...item, allInputData]);
            setInputData("");
        }
    }

    const deleteItem = (idx) => {
        const updatedItem = item.filter((val) => {
            return val.id !== idx;
        })
        setItem(updatedItem);
    }

    const removeAll = () => {
        setItem([]);
    }

    const editItem = (id) => {
        let newEditItem = item.find((elem) => {
            return elem.id === id;
        });

        setToggleSubmit(false);
        setInputData(newEditItem.name);
        setIsEditItem(id);
    }

    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(item));
    }, [item])


    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="https://img.freepik.com/premium-psd/3d-smartphone-with-checklist-screen-todo-tasks-list-vote-form-online-survey-concept_356415-2328.jpg?w=100" alt="todo logo" />
                        <figcaption>Add Your List Here ✌🏻</figcaption>
                    </figure>
                    <div className="addItems">
                        <input type="text" placeholder='✍🏻 Add Items...' value={inputData} onChange={(e) => setInputData(e.target.value)} />
                        {
                            toggleSubmit ? <i className="fa fa-solid fa-plus add-btn" title="Add Item" onClick={addItem}></i> : <i className="far fa-solid fa-edit add-btn" title="Update Item" onClick={addItem}></i>
                        }
                    </div>
                    <div className="showItems">
                        {
                            item.map((elem) => {
                                return (
                                    <div className="eachItem" key={elem.id}>
                                        <h3>{elem.name}</h3>
                                        <div className="todo-btn">
                                            <i class="far fa-solid fa-edit add-btn" title="Edit Item" onClick={() => editItem(elem.id)}></i>
                                            <i class="far fa-solid fa-trash fa-trash-alt add-btn" title="delete Item" onClick={() => deleteItem(elem.id)}></i>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div className="showItems">
                        <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}><span>CHECK LIST</span></button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Todo;