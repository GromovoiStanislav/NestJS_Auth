import {
  AbilityBuilder,
  createMongoAbility,
  ForbiddenError,
} from '@casl/ability';

const defineAbility = (user) => {
  const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

  if (user.isAdmin) {
    can('manage', 'all'); // can manage (i.e., do anything)
  } else {
    can('read', 'Post'); // can read all posts
    //can('update', 'Post', { authorId: user.id }); // only own posts
    can('update', 'Post', ['content'], { authorId: user.id }); // only own posts
    cannot('delete', 'Post').because('Only admins can delete posts');
  }

  // cannot('delete', 'Post'); // cannot delete a post

  return build();
};

const deletePost = (post) => console.log('Deleted');

const user = {
  id: 5,
  isAdmin: false,
};

class Entity {
  constructor(attrs) {
    Object.assign(this, attrs);
  }
}

class Post extends Entity {}

const somePost = new Post({
  authorId: user.id,
  isPublished: false, //only admin can toggle
  content: 'some text',
});

const ability = defineAbility(user);

//const isAllowed = ability.can('read', 'Post');
// const isAllowed = ability.can('update', somePost);

console.log('isAllowed:', ability.can('update', somePost, 'content'));
console.log('isAllowed:', ability.can('update', somePost, 'isPublished'));
console.log('isAllowed:', ability.can('delete', somePost));

try {
  ForbiddenError.from(ability).throwUnlessCan('delete', somePost);
  deletePost(somePost);
} catch (err) {
  console.log('ForbiddenError:', err.message);
}

try {
  const canDelete = ability.can('delete', somePost);
  if (!canDelete) {
    throw new Error("You can't delete");
  }
  deletePost(somePost);
} catch (err) {
  console.log('Error:', err.message);
}
