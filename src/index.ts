import { find } from '@mapbox/node-pre-gyp';
import { join } from 'path';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const erlpack = require(find(join(__dirname, '..', 'package.json')));
const kPackCustom = Symbol.for('erlpack.pack.custom');

export interface WithPackCustom {
	[kPackCustom](): Packable;
}

export type Packable = string | number | bigint | null | undefined | boolean | WithPackCustom | Packable[] | { [P in string | number]: Packable };

/**
 * Packs data into ETF format.
 * @param {Packable} data Data to pack.
 * @returns {Buffer} The packed data.
 */
export function pack(data?: Packable): Buffer {
	return erlpack.pack(data, kPackCustom);
}
pack.custom = kPackCustom;

// eslint-disable-next-line @typescript-eslint/no-namespace
export declare namespace pack {
	const custom: typeof kPackCustom;
}

/**
 * Unpacks ETF formatted data.
 * @param {Uint8Array|Uint8ClampedArray|Buffer} data The data to unpack.
 * @param {boolean} [decodeBigint=false] If to decode bigints.
 * @returns {any} The unpacked data.
 */
export const unpack = <T extends Exclude<Packable, WithPackCustom> = Exclude<Packable, WithPackCustom>>(
	data: Uint8Array | Uint8ClampedArray | Buffer,
	decodeBigint = false
): T => erlpack.unpack(data, decodeBigint);

export default pack;
