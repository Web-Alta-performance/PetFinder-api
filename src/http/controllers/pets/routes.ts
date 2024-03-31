import { Router } from 'express';
import { get } from './get';
import { fetch } from './fetch';
import { create } from './create';
import { disable } from './disable';
import { changeOwner } from './change-owner';

const petRoutes = Router();

petRoutes.get('/', fetch);
petRoutes.get('/:petId', get);
petRoutes.post('/', create);
petRoutes.delete('/:petId', disable);
petRoutes.put('/:petId', changeOwner);

export { petRoutes };