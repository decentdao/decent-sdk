# Decent SDK [WIP]

A unified SDK for the Decent API that works in both Node.js and React environments.

## Installation

```bash
npm install decent-sdk
```

## Usage

### Core API (Works in Node.js and browsers)

```typescript
// Import core functions
import { getDao, getAllDaos } from 'decent-sdk';

// Use core functions
const fetchDao = async () => {
  const dao = await getDao({ 
    chainId: 8453, 
    address: '0x1234...' 
  });
  console.log(dao);
};
```

### React Hooks

```typescript
// Import React hooks
import { useFetchDao, useFetchDaos } from 'decent-sdk/react';
import { DecentApiProvider } from 'decent-sdk/react';

// Wrap your app with the provider
<DecentApiProvider apiUrl="https://api.decent.xyz">
  <DaoComponent />
</DecentApiProvider>

function DaoComponent() {
  // Use the hook with parameters
  const { dao, isLoading, error } = useFetchDao({
    chainId: 8453,
    address: '0x1234...',
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      <h1>{dao?.name}</h1>
      {/* Rest of your component */}
    </div>
  );
}
```

## Development

```bash
# Install dependencies
bun install

# Build the SDK
bun build

# Run tests
bun test
```
