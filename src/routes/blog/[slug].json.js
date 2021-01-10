import sanityClient from '../../source/sanity';

export async function get(req, res, next) {
	try {
		const { slug } = req.params;

		if (!slug) {
			res.writeHead(400, {
				'Content-Type': 'application/json'
			});
			res.end(JSON.stringify({
				message: 'parameter slug is required'
			}));
			return;
		}

		const post = await sanityClient.fetch('*[_type == "post" && slug.current == $slug][0]', { slug });

		if (!post) {
			res.writeHead(404, {
				'Content-Type': 'application/json'
			});
			res.end(JSON.stringify({
				message: 'not found'
			}));
			return;
		}

		res.writeHead(200, {
			'Content-Type': 'application/json'
		});
		res.end(JSON.stringify(post));
	} catch (err) {
		res.writeHead(500, {
			'Content-Type': 'application/json'
		});
		res.end(JSON.stringify({
			message: 'something went wrong',
			err,
		}));
	}
}
