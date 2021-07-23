import { Plugin } from 'prosemirror-state';
import { getMentionsPlugin } from 'prosemirror-mentions';

/**
 * IMPORTANT: outer div's "suggestion-item-list" class is mandatory. The plugin uses this class for querying.
 * IMPORTANT: inner div's "suggestion-item" class is mandatory too for the same reasons
 */
var getMentionSuggestionsHTML = items =>
  '<div class="suggestion-item-list">' +
  items.map(i => '<div class="suggestion-item">' + i.name + '</div>').join('') +
  '</div>';

/**
 * IMPORTANT: outer div's "suggestion-item-list" class is mandatory. The plugin uses this class for querying.
 * IMPORTANT: inner div's "suggestion-item" class is mandatory too for the same reasons
 */
var getTagSuggestionsHTML = items =>
  '<div class="suggestion-item-list">' +
  items.map(i => '<div class="suggestion-item">' + i.tag + '</div>').join('') +
  '</div>';

const users = [
  {
    name: 'Tom',
    id: '1',
    email: 'tom@gmail.com'
  },
  {
    name: 'Deck',
    id: '2',
    email: 'deck@gmail.com'
  },
  {
    name: 'John Doe',
    id: '3',
    email: 'joe@gmail.com'
  },
  {
    name: 'Joe Lewis',
    id: '4',
    email: 'lewis@gmail.com'
  }
];

var mentionPlugin = getMentionsPlugin({
  getSuggestions: (type, text, done) => {
    setTimeout(() => {
      if (type === 'mention') {
        // autocomplete : filter list from text and return 5 users
        done(
          users
            .filter(x => x.name.toLowerCase().includes(text.toLowerCase()))
            .splice(0, 5)
        );
      } else {
        // pass dummy tag suggestions
        done([
          {
            tag: 'WikiLeaks'
          },
          {
            tag: 'NetNeutrality'
          }
        ]);
      }
    }, 0);
  },
  getSuggestionsHTML: (items, type) => {
    if (type === 'mention') {
      return getMentionSuggestionsHTML(items);
    } else if (type === 'tag') {
      return getTagSuggestionsHTML(items);
    } else {
      return null;
    }
  }
});

const getPlugins = (): Plugin[] => {
  const plugins = [mentionPlugin];

  return plugins;
};

export default getPlugins();
