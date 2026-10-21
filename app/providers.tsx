'use client'

import { useMemo } from "react"
import { SpacetimeDBProvider } from "spacetimedb/react"
import { DbConnection } from "../src/module_bindings"

const HOST = process.env.NEXT_PUBLIC_SPACETIMEDB_HOST ?? 'ws://localhost:3000'

const DBNAME = process.env.NEXT_PUBLIC_SPACETIMEDB_DB_NAME ?? 'where-are-you' 

export function Providers({children}: {children: React.ReactNode}) {
    const connectionBuilder = useMemo(
        () => DbConnection.builder()
                .withUri(HOST)
                .withDatabaseName(DBNAME)
                .withToken(sessionStorage.getItem('auth_token') || undefined)
                // sessionStorage (no tlocalStorage) so every browser tab
                // is its own identity - its own friend on the map
                .onConnect((_conn, _identity, token) => {
                    sessionStorage.setItem('auth_token', token);
                }),
        []  
    );

    return (
        <SpacetimeDBProvider connectionBuilder={connectionBuilder}>
            {children}
        </SpacetimeDBProvider>
    )
}
