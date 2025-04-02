import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, SelectControl, Spinner, ColorPalette, RangeControl } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import './editor.scss';
import './style.scss';

export default function Edit({ attributes, setAttributes }) {
	const {
		selectedType = '',
		pokemons = [],
		backgroundColor = '#ffffff',
		textColor = '#000000',
		fontSize = 16,
		itemBackground = '#f5f5f5',
		itemTextColor = '#333333',
		customClassName = ''
	} = attributes;

	const [types, setTypes] = useState([]);
	const [loading, setLoading] = useState(false);

	const blockProps = useBlockProps({
		className: `pokemon-block ${customClassName}`,
		style: {
			backgroundColor,
			color: textColor,
			fontSize: `${fontSize}px`,
			padding: '20px',
			borderRadius: '8px'
		}
	});

	// load pokemons type
	useEffect(() => {
		fetch('https://pokeapi.co/api/v2/type')
			.then(res => res.json())
			.then(data => setTypes(data.results))
			.catch(console.error);
	}, []);

	// load pokemons by type
	useEffect(() => {
		if (!selectedType) {
			setAttributes({ pokemons: [] });
			return;
		}

		setLoading(true);
		fetch(`https://pokeapi.co/api/v2/type/${selectedType}`)
			.then(res => res.json())
			.then(data => {
				const pokemonIds = new Set();
				const limitedPokemons = data.pokemon
					.filter(p => {
						const id = p.pokemon.url.split('/')[6];
						if (!pokemonIds.has(id)) {
							pokemonIds.add(id);
							return true;
						}
						return false;
					})
					.slice(0, 10)
					.map(p => ({
						...p.pokemon,
						id: p.pokemon.url.split('/')[6]
					}));
				setAttributes({ pokemons: limitedPokemons });
			})
			.finally(() => setLoading(false))
			.catch(console.error);
	}, [selectedType]);

	return (
		<div {...blockProps}>
			<InspectorControls>
				<PanelBody title={__('Pokemon Settings', 'pokemon-block')}>
					<SelectControl
						label={__('Pokemon Type', 'pokemon-block')}
						value={selectedType}
						options={[
							{ label: __('Select type', 'pokemon-block'), value: '' },
							...types.map(t => ({
								label: t.name.charAt(0).toUpperCase() + t.name.slice(1),
								value: t.name
							}))
						]}
						onChange={value => setAttributes({ selectedType: value })}
						__nextHasNoMarginBottom
					/>
				</PanelBody>

				<PanelBody title={__('Color Settings', 'pokemon-block')}>
					<h3>{__('Background Color', 'pokemon-block')}</h3>
					<ColorPalette
						value={backgroundColor}
						onChange={(color) => setAttributes({ backgroundColor: color })}
					/>

					<h3>{__('Text Color', 'pokemon-block')}</h3>
					<ColorPalette
						value={textColor}
						onChange={(color) => setAttributes({ textColor: color })}
					/>

					<h3>{__('Card Background', 'pokemon-block')}</h3>
					<ColorPalette
						value={itemBackground}
						onChange={(color) => setAttributes({ itemBackground: color })}
					/>

					<h3>{__('Card Text Color', 'pokemon-block')}</h3>
					<ColorPalette
						value={itemTextColor}
						onChange={(color) => setAttributes({ itemTextColor: color })}
					/>
				</PanelBody>

				<PanelBody title={__('Typography', 'pokemon-block')}>
					<RangeControl
						label={__('Font Size', 'pokemon-block')}
						value={fontSize}
						onChange={(size) => setAttributes({ fontSize: size })}
						min={12}
						max={24}
						step={1}
						__nextHasNoMarginBottom
					/>
				</PanelBody>

			</InspectorControls>

			{!selectedType ? (
				<div className="pokemon-empty">
					{__('Select pokemon type', 'pokemon-block')}
				</div>
			) : loading ? (
				<Spinner />
			) : pokemons.length === 0 ? (
				<div className="pokemon-empty">
					{__('No pokemons found', 'pokemon-block')}
				</div>
			) : (
				<div className="pokemon-list">
					{pokemons.map((pokemon) => (
						<div
							key={pokemon.id}
							className="pokemon-item"
							style={{
								backgroundColor: itemBackground,
								color: itemTextColor
							}}
						>
							<div className="pokemon-content">
								<img
									src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
									alt={pokemon.name}
									width="48"
									height="48"
									loading="lazy"
								/>
								<span className="pokemon-name">
                                    {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                                </span>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
