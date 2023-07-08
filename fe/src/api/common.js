export const buildFilter = ( values ) =>
{
	delete values.total;
	delete values.total_page;
	let params = {};
	if ( values )
	{
		let arrCondition = Object.entries( values );

		params = arrCondition.reduce( ( param, item ) =>
		{
			if ( item[ 1 ] != null )
			{
				param = { ...param, ...buildItemParam( item[ 0 ], item[ 1 ], param ) }
			}
			return param;
		}, {} );
	}
	return params;
}

export const buildItemParam = ( key, value, params ) =>
{
	if ( key == 'page' && !value )
	{
		params[ 'page' ] = value;
	} else if ( value )
	{
		params[ `${ key }` ] = value;
	}
	return params;
}

export const setItem = ( key, value ) =>
{
	localStorage.setItem( key, value );
}

export const getItem = (key) => {
	return localStorage.getItem(key) || null;
}

export const removeItem = (key) => {
	localStorage.removeItem(key);
}

export const timeDelay = async (delay) => {
	return new Promise(res => setTimeout(res, delay))
}

export const setField = (form,field, value, setForm) => {
	setForm({
		...form,
		[field]: value
	});
};