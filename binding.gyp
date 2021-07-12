{
	'targets': [
		{
			'target_name': '<(module_name)',
			'product_dir': '<(module_path)',
			'sources': [
				'lib/erlpack.cc'
			],
			'include_dirs': [
				'<!@(node -p "require(\'node-addon-api\').include")'
			],
			'cflags!': ['-fno-exceptions'],
			'cflags_cc!': ['-Wall', '-Wextra'],
			'defines': ['NAPI_DISABLE_CPP_EXCEPTIONS'],
		},
	],
}
