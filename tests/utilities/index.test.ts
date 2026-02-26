import {expect} from 'chai';
import { modularMath } from '../../utilities/modularMaths';

expect(modularMath.XOR([34])).is("0");

expect(modularMath.XOR([13])).is("1");