# crypto-lib.ts

A comprehensive cryptography library built with TypeScript for **learning and practice purposes only**. This library implements various cryptographic algorithms including symmetric ciphers, asymmetric ciphers, hash functions, and cryptographic utilities.

⚠️ **DISCLAIMER**: This library is designed for educational purposes and should **NOT** be used in production environments. For production use, rely on battle-tested libraries like `libsodium`, `tweetnacl`, or Node.js's built-in `crypto` module.

## Features

- 🔐 **Symmetric Ciphers**: AES, DES, and other block cipher implementations
- 🔑 **Asymmetric Ciphers**: RSA, ECDSA, and elliptic curve cryptography
- #️⃣ **Hash Functions**: SHA-1, SHA-3 and other cryptographic hashes
- 🛠️ **Utilities**: Key derivation, random number generation, encoding/decoding
- 📚 **Well-documented**: Each component includes detailed explanations and examples

## Project Structure

```
crypto-lib.ts/
├── README.md
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts                          # Main entry point
│   │
│   ├── some-symmetric-cipher/                        # Symmetric cipher implementations
│   │   ├── index.ts                      # Exports all symmetric ciphers
│   │   ├── some-symmetric-cipher/
│   │   │   ├── index.ts                 
│   │   │   ├── infra/
│   │   │   └── tests/
│   │   │       ├── aes.test.ts
│   │   │       └── modes.test.ts
│   │
│   ├── asymmetric/                       # Asymmetric cipher implementations
│   │   ├── index.ts                      # Exports all asymmetric ciphers
│   │   ├── some-asymmetric-cipher/
│   │   │   ├── index.ts
│   │   │   ├── infra/
│   │   │   └── tests/
│   ├── hashing/                          # Hash function implementations
│   │   ├── index.ts                      # Exports all hash functions
│   │   ├── some-hash-function/
│   │   │   ├── index.ts
│   │   │   ├── some-hash-function.ts
│   │   │   ├── infra/
│   │   │   │   ├── constants.ts          # K and H constants
│   │   │   │   ├── operations.ts         # Ch, Maj, Sigma functions
│   │   │   │   └── messageSchedule.ts
│   │   │   └── tests/
│   │   │       └── some-hash-function.test.ts
│   ├── utilities/                        # Utility functions and helper
│   └── types/                            # TypeScript type definitions
├── docs/                                 # Documentation
│   ├── ALGORITHMS.md                     # Algorithm explanations
│   ├── GETTING_STARTED.md
│   └── SECURITY_CONSIDERATIONS.md
│
└── examples/                             # Usage examples
├── symmetric-cipher.ts
├── asymmetric-cipher.ts
├── hashing.ts
└── key-derivation.ts
```

### Instalation

```bash
npm install crypto-lib.ts
```

### Testing
```bash
npm test
```

All components include comprehensive unit tests. Run with coverage:
```bash
npm test:coverage
```



### Type Safety
All components are fully typed with TypeScript for better developer experience and type safety.

### Contributing
This is a learning project. Feel free to fork and experiment! However, keep in mind:

This is not production-ready
Implementations may not be optimized
Security audits have not been performed

## ⚠️ Security Warning
DO NOT USE THIS LIBRARY IN PRODUCTION

This library is built for educational purposes to understand cryptographic internals. For production use, always rely on knowledge and patterns learned from "Understanding Cryptography"-book written by Christof Paar.


Production systems require:

Extensive security audits
Constant maintenance and updates
Professional security reviews
Optimization and hardening
