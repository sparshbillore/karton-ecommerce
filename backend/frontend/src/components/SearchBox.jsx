import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom'

function SearchBox() {
    const [keyword, setKeyword] = useState('')

    const navigate = useNavigate()
    const locate = useLocation()

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword) {
            navigate(`/?keyword=${keyword}&page=1`)
        } else {
            console.log('pathname', locate.pathname)
            navigate(navigate(locate.pathname))
        }
    }
    return (
        <Form onSubmit={submitHandler} inline className="d-flex align-items-center justify-content-between ">
            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                className='mr-sm-2 ml-sm-5'
            ></Form.Control>

            <Button
                type='submit'
                variant='outline-success'
                className='p-2 ms-2'
            >
                Submit
            </Button>
        </Form>
    )
}

export default SearchBox