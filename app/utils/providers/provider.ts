import { useMatches } from '@remix-run/react'
import * as React from 'react'
import { type Strategy } from 'remix-auth'
import { type DonHandle } from '#app/types.ts'
import { type Timings } from '../timing.server.ts'

// Auth Provider Types
export type ProviderUser = {
  id: string
  email: string
  username?: string
  name?: string
  imageUrl?: string
}

export interface AuthProvider {
  getAuthStrategy(): Strategy<ProviderUser, any>
  handleMockAction(request: Request): Promise<void>
  resolveConnectionData(
    providerId: string,
    options?: { timings?: Timings },
  ): Promise<{
    displayName: string
    link?: string | null
  }>
}

// Utility Functions
export const normalizeEmail = (s: string) => s.toLowerCase()
export const normalizeUsername = (s: string) =>
  s.replace(/[^a-zA-Z0-9_]/g, '_').toLowerCase()

// Context Creation Utility
function createSimpleContext<ContextType>(name: string) {
  const defaultValue = Symbol(`Default ${name} context value`)
  const Context = React.createContext<ContextType | null | typeof defaultValue>(
    defaultValue,
  )
  Context.displayName = name

  function useValue() {
    const value = React.useContext(Context)
    if (value === defaultValue) {
      throw new Error(`use${name} must be used within ${name}Provider`)
    }
    if (!value) {
      throw new Error(
        `No value in ${name}Provider context. If the value is optional in this situation, try useOptional${name} instead of use${name}`,
      )
    }
    return value
  }

  function useOptionalValue() {
    const value = React.useContext(Context)
    if (value === defaultValue) {
      throw new Error(`useOptional${name} must be used within ${name}Provider`)
    }
    return value
  }

  return { Provider: Context.Provider, useValue, useOptionalValue }
}

// UI State Types
type ChatsEpisodeUIState = {
  sortOrder: 'desc' | 'asc'
}

type CallsEpisodeUIState = {
  sortOrder: 'desc' | 'asc'
}

// UI State Context Providers
const {
  Provider: ChatsEpisodeUIStateProvider,
  useValue: useChatsEpisodeUIState,
} = createSimpleContext<ChatsEpisodeUIState>('ChatsEpisodeUIState')

const {
  Provider: CallsEpisodeUIStateProvider,
  useValue: useCallsEpisodeUIState,
} = createSimpleContext<CallsEpisodeUIState>('CallsEpisodeUIState')

// Loader Data Access Utilities
function useMatchLoaderData<LoaderData>(handleId: string) {
  const matches = useMatches()
  const match = matches.find(
    ({ handle }) => (handle as DonHandle | undefined)?.id === handleId,
  )
  if (!match) {
    throw new Error(`No active route has a handle ID of ${handleId}`)
  }
  return match.data as LoaderData
}

function useOptionalMatchLoaderData<LoaderData>(handleId: string) {
  const matches = useMatches()
  return matches.find(
    ({ handle }) => (handle as DonHandle | undefined)?.id === handleId,
  )?.data as LoaderData | undefined
}

// Exports
export {
  createSimpleContext,
  ChatsEpisodeUIStateProvider,
  useChatsEpisodeUIState,
  CallsEpisodeUIStateProvider,
  useCallsEpisodeUIState,
  useMatchLoaderData,
  useOptionalMatchLoaderData,
}