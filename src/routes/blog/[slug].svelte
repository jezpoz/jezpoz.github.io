<script context="module">
  export async function preload({ params }) {
    const { slug } = params;
    const res = await this.fetch(`/blog/${slug}.json`);
    const post = await res.json();

    return {
      post,
    }
  }
</script>

<script>
  import blocksToHtml from '@sanity/block-content-to-html';

  export let post;

  let content = null;

  if (!!post.body) {
    const h = blocksToHtml.h

    const serializers = {
      types: {
        code: props => (
          h('pre', {className: props.node.language},
            h('code', props.node.code)
          )
        )
      }
    }

    content = blocksToHtml({
      projectId: 'r7xgkr2j',
      dataset: 'production',
      blocks: post.body,
      serializers,
    });
  }
  
</script>

<style>
	/*
		By default, CSS is locally scoped to the component,
		and any unused styles are dead-code-eliminated.
		In this page, Svelte can't know which elements are
		going to appear inside the {{{post.html}}} block,
		so we have to use the :global(...) modifier to target
		all elements inside .content
	*/
	.content :global(h2) {
		font-size: 1.4em;
		font-weight: 500;
	}

	.content :global(pre) {
		background-color: #f9f9f9;
		box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.05);
		padding: 0.5em;
		border-radius: 2px;
		overflow-x: auto;
	}

	.content :global(pre) :global(code) {
		background-color: transparent;
		padding: 0;
	}

	.content :global(ul) {
		line-height: 1.5;
	}

	.content :global(li) {
		margin: 0 0 0.5em 0;
	}
</style>

<svelte:head>
	<title>{post.title}</title>
</svelte:head>

<h1>{post.title}</h1>
<div class="content">
  {@html content}
</div>
