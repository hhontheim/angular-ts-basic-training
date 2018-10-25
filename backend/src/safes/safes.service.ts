import { Safe } from './interfaces/safe.interface';
import { Injectable, HttpException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { SafeItem } from './interfaces/safeitem';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {
  map,
  switchMap,
  switchMapTo,
  tap,
  concatMapTo,
  take,
  startWith,
} from 'rxjs/operators';

@Injectable()
export class SafesService {
  private readonly safesMock: Safe[] = [
    {
      id: uuid(),
      value: 999,
      itemSize: 2,
      active: true,
      activeSince: new Date(),
    },
    {
      id: uuid(),
      value: 123,
      itemSize: 3,
      active: true,
      activeSince: new Date(),
    },
  ];

  private readonly itemsMock: SafeItem[][] = [
    [
      {
        id: uuid(),
        price: 134,
        invoiceId: null,
        name: 'Fahhrad',
      },
      {
        id: uuid(),
        price: 234,
        invoiceId: null,
        name: 'Fahhrad',
      },
    ],
    [
      {
        id: uuid(),
        price: 12,
        invoiceId: null,
        name: 'Fahhrad',
      },
      {
        id: uuid(),
        price: 34,
        invoiceId: null,
        name: 'Auto',
      },
      {
        id: uuid(),
        price: 45,
        invoiceId: null,
        name: 'Laptop',
      },
      {
        id: uuid(),
        price: 56,
        invoiceId: null,
        name: 'UsbStick',
      },
    ],
  ];

  private readonly safes: BehaviorSubject<Safe[]> = new BehaviorSubject<Safe[]>(
    this.safesMock,
  );
  private readonly items: BehaviorSubject<SafeItem[][]> = new BehaviorSubject<
    SafeItem[][]
  >(this.itemsMock);

  constructor() {
    let newsafes = [];

    // recalculare safemock data
    this.safesMock.forEach(safe => {
      const index = this.safesMock.indexOf(safe);
      const items2 = this.itemsMock[index];
      const prize = items2
        .map(item => item.price)
        .reduce((val, sum) => sum + val);
      const result = { ...safe, value: prize, itemSize: items2.length };
      newsafes = [...newsafes, result];
    });
    this.safes.next(newsafes);
  }

  create(safe: Safe) {
    this.safes.next([...this.safes.getValue(), safe]);
  }

  getItems(safeId: string): Observable<SafeItem[]> {
    return this.safes.pipe(
      map(safes1 => {
        const index = safes1.indexOf(safes1.find(safe => safe.id === safeId));
        if (index > -1) {
          return this.items.getValue()[index];
        }
        return null;
      }),
      take(1),
    );
  }

  addItem(item: SafeItem, safeId: string): Observable<SafeItem> {
    const createItem = { ...item, id: uuid() };
    const newItems$ = this.getItems(safeId).pipe(
      map((items: SafeItem[]) => {
        return [...items, createItem];
      }),
      map(items => [...this.items.getValue(), items]),
    );
    newItems$.subscribe(this.items);
    return of(createItem);
  }

  findAll(): Observable<Safe[]> {
    return this.safes.asObservable().pipe(take(1));
  }

  findOne(id: string): Observable<Safe> {
    const observable = this.safes.pipe(
      map(safe3 => safe3.find(safe => safe.id === id)),
    );
    return observable;
  }
}
