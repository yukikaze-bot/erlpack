import * as erlpack from '../dist';

describe('packs', () => {
	it('string with null byte', () => {
		const packed = erlpack.pack('hello\u0000 world');
		const expected = Buffer.from('\u0083m\u0000\u0000\u0000\u000Chello\u0000 world', 'binary');

		expect(packed.equals(expected)).toBe(true);
	});

	it('string without null byte', () => {
		const packed = erlpack.pack('hello world');
		const expected = Buffer.from('\u0083m\u0000\u0000\u0000\u000Bhello world', 'binary');

		expect(packed.equals(expected)).toBe(true);
	});

	it('dictionary', () => {
		const expected = Buffer.from(
			'\u0083t\u0000\u0000\u0000\u0003a\u0002a\u0002a\u0003l\u0000\u0000\u0000\u0003a\u0001a\u0002a\u0003jm\u0000\u0000\u0000\u0001aa\u0001',
			'binary'
		);
		const packed = erlpack.pack({ a: 1, '2': 2, '3': [1, 2, 3] });

		expect(packed.equals(expected)).toBe(true);
	});

	it('false', () => {
		const expected = Buffer.from('\u0083s\u0005false', 'binary');
		const packed = erlpack.pack(false);

		expect(packed.equals(expected)).toBe(true);
	});

	it('true', () => {
		const expected = Buffer.from('\u0083s\u0004true', 'binary');
		const packed = erlpack.pack(true);

		expect(packed.equals(expected)).toBe(true);
	});

	it('null is nil', () => {
		const expected = Buffer.from('\u0083s\u0003nil', 'binary');
		const packed = erlpack.pack(null);

		expect(packed.equals(expected)).toBe(true);
	});

	it('undefined is nil', () => {
		const expected = Buffer.from('\u0083s\u0003nil', 'binary');
		const packed = erlpack.pack();

		expect(packed.equals(expected)).toBe(true);
	});

	it('floats as new floats', () => {
		expect(erlpack.pack(2.5).equals(Buffer.from('\u0083F\u0040\u0004\u0000\u0000\u0000\u0000\u0000\u0000', 'binary'))).toBe(true);
		expect(
			erlpack
				.pack(51512123841234.31423412341435123412341342)
				.equals(Buffer.from('\u0083F\u0042\u00C7\u006C\u00CC\u00EB\u00ED\u0069\u0028', 'binary'))
		).toBe(true);
	});

	it('small int', () => {
		for (let index = 0; index < 256; ++index) {
			const expected = Buffer.alloc(3);

			expected.write('\u0083a', 0, 2, 'binary');
			expected.writeUInt8(index, 2);

			const packed = erlpack.pack(index);

			expect(expected.equals(packed)).toBe(true);
		}
	});

	it('int32', () => {
		expect(erlpack.pack(1024).equals(Buffer.from('\u0083b\u0000\u0000\u0004\u0000', 'binary'))).toBe(true);
		expect(erlpack.pack(-2147483648).equals(Buffer.from('\u0083b\u0080\u0000\u0000\u0000', 'binary'))).toBe(true);
		expect(erlpack.pack(2147483647).equals(Buffer.from('\u0083b\u007F\u00FF\u00FF\u00FF', 'binary'))).toBe(true);
	});

	it('big ints', () => {
		expect(erlpack.pack(-67305985n).equals(Buffer.from('\u0083n\u0004\u0001\u0001\u0002\u0003\u0004', 'binary'))).toBe(true);
		expect(erlpack.pack(67305985n).equals(Buffer.from('\u0083n\u0004\u0000\u0001\u0002\u0003\u0004', 'binary'))).toBe(true);
		expect(
			erlpack.pack(-578437695752307201n).equals(Buffer.from('\u0083n\u0008\u0001\u0001\u0002\u0003\u0004\u0005\u0006\u0007\u0008', 'binary'))
		).toBe(true);
		expect(
			erlpack.pack(578437695752307201n).equals(Buffer.from('\u0083n\u0008\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\u0008', 'binary'))
		).toBe(true);
	});

	it('list', () => {
		const expected = Buffer.from(
			'\u0083l\u0000\u0000\u0000\u0005a\u0001m\u0000\u0000\u0000\u0003twoF\u0040\u0008\u00CC\u00CC\u00CC\u00CC\u00CC\u00CDm\u0000\u0000\u0000\u0004fourl\u0000\u0000\u0000\u0001m\u0000\u0000\u0000\u0004fivejj',
			'binary'
		);
		const packed = erlpack.pack([1, 'two', 3.1, 'four', ['five']]);

		expect(packed.equals(expected)).toBe(true);
	});

	it('empty list', () => {
		expect(erlpack.pack([]).equals(Buffer.from('\u0083j', 'binary'))).toBe(true);
	});
});
