import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, query, where } from 'firebase/firestore';

import { CharacterScheme } from '@/schemes';
import { firebaseDb } from '@/api';

const getAllDreams = createAsyncThunk('dreamList/get', async (uid: string) => {
  try {
    const q = query(
      collection(firebaseDb, 'dreams'),
      where('userUid', '==', uid),
    );
    const docsSnap = await getDocs(q);
    const data = CharacterScheme.array().safeParse(
      docsSnap.docs.map((item) => ({ id: item.id, ...item.data() })),
    );
    return data;
  } catch {}
});
