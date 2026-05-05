import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { UidContext } from '../components/AppContext'
import { useContext } from 'react'
import { isEmpty } from '../components/Utils'

export const Home = () => {
    type appDispatch = () => any 

    return (
        <div>
            {uid ? (
                <>
                    <div className="preloader">
                        
                    </div>
                </>
            )}
        </div>
    )
}
