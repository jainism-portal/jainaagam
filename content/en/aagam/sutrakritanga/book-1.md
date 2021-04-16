---
title: Book 1

type: book

order:
  cat: anga
  aagam: 
    position: 2
    depth: 1
  book: 
    position: 1
    depth: 2

parent:
  type: aagam

children:
  type: chapter
  count: 16

---

## Meaning

<children :children="children"></children>