'use client'

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useSpacetimeDB, useTable, useReducer } from "spacetimedb/react"
import { tables, reducers } from '../src/module_bindings'
import { Providers } from './providers'

const STEP = 0.0005

const pin = (name: string, isMe: boolean) => 
    L.divIcon({
        className: '',
        iconSize: [0,0],
        html: `<div class="pin ${isMe ? 'me' : ''}">
                <span>${name.replace(/[<>&]/g, '')}</span>
                </div>`
    })


function FriendMap() {
    const { isActive, identity } = useSpacetimeDB()
    const [users] = useTable(tables.user)
    const setName = useReducer(reducers.setName)
    const updateLocation = useReducer(reducers.updateLocation)

    const [pos, setPos] = useState(() => ({
        lat: 44.650853 + (Math.random() - 0.5) * 0.004,
        lng: -63.592444 + (Math.random() - 0.5) * 0.004,
    }))

    // set default location randomly around downtown halifax

    const [myName, setMyName] = useState(
        () => sessionStorage.getItem('name') || `Friend ${Math.floor(Math.random() * 100)}` 
    )
    // random number for person if no name found

    useEffect(() => {
        if (isActive) return;

        sessionStorage.setItem('name', myName)
        setName({ name: myName })

    }, [isActive, myName])

    useEffect(() => {
        if (isActive) updateLocation(pos)
    }, [isActive, pos])

    



}
