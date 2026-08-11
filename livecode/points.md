Rule to Remember

For arrays in React:

Add
setSelected(prev => [...prev, item]);
Remove
setSelected(prev => prev.filter(i => i !== item));
Check
selected.includes(item);