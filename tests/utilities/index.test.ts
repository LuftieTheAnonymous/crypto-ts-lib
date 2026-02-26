import {expect} from 'chai';
import { modularMath } from '../../index';

    expect(modularMath.XOR([34])).is("0").ok('success', 'the expected output is correct');

    expect(modularMath.XOR([13])).is("1").ok('success', 'the expected output is correct');