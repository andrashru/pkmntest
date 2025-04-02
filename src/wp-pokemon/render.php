<?php
/**
 * Render the Pokemon block on the frontend.
 *
 * @param array    $attributes The block attributes.
 * @param string   $content    The block content.
 * @param WP_Block $block      The block instance.
 * @return string
 */
$wrapper_attributes = get_block_wrapper_attributes([
    'style' => implode(' ', [
        'background-color: ' . ($attributes['backgroundColor'] ?? '#ffffff') . ';',
        'color: ' . ($attributes['textColor'] ?? '#000000') . ';',
        'font-size: ' . ($attributes['fontSize'] ?? 16) . 'px;',
        'padding: 20px;',
        'border-radius: 8px;'
    ]),
    'class' => isset($attributes['customClassName']) ? 'pokemon-block ' . $attributes['customClassName'] : 'pokemon-block'
]);

$selected_type = $attributes['selectedType'] ?? '';
$pokemons = $attributes['pokemons'] ?? [];
?>

<div <?php echo $wrapper_attributes; ?>>
    <?php if (empty($selected_type)) : ?>
        <div class="pokemon-empty">
            <?php echo esc_html__('Select pokemon type in editor', 'pokemon-block'); ?>
        </div>
    <?php elseif (empty($pokemons)) : ?>
        <div class="pokemon-empty">
            <?php echo esc_html__('No pokemons found', 'pokemon-block'); ?>
        </div>
    <?php else : ?>
        <h2 class="pokemon-type-title">
            <?php
            printf(
                esc_html__('Pokemon Type: %s', 'pokemon-block'),
                esc_html($selected_type)
            );
            ?>
        </h2>
        <div class="pokemon-list">
            <?php foreach ($pokemons as $pokemon) :
                $pokemon_id = isset($pokemon['url']) ? explode('/', $pokemon['url'])[6] : $pokemon['id'];
                $pokemon_name = $pokemon['name'];
                $item_style = implode(' ', [
                    'background-color: ' . ($attributes['itemBackground'] ?? '#f5f5f5') . ';',
                    'color: ' . ($attributes['itemTextColor'] ?? '#333333') . ';'
                ]);
            ?>
                <div class="pokemon-item" style="<?php echo esc_attr($item_style); ?>">
                    <div class="pokemon-image">
                        <img
                            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/<?php echo esc_attr($pokemon_id); ?>.png"
                            alt="<?php echo esc_attr($pokemon_name); ?>"
                            width="48"
                            height="48"
                            loading="lazy"
                        />
                    </div>
                    <h3 class="pokemon-title">
                        <?php echo esc_html($pokemon_name); ?>
                    </h3>
                </div>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>
</div>
