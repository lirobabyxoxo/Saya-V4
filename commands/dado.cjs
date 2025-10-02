const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: 'dado',
    aliases: ['roll', 'd'],
    description: 'Rola um dado até o número especificado',
    
    slashData: new SlashCommandBuilder()
        .setName('dado')
        .setDescription('Rola um dado até o número especificado')
        .addIntegerOption(option =>
            option.setName('lados')
                .setDescription('Número de lados do dado (padrão: 6)')
                .setRequired(false)
                .setMinValue(2)
                .setMaxValue(1000)
        ),
    
    async execute(message, args, client, config, colors, createYakuzaEmbed, emojis) {
        const sides = parseInt(args[0]) || 6;
        
        if (sides < 2) {
            const errorEmbed = createYakuzaEmbed(
                'Erro',
                'O dado precisa ter pelo menos 2 lados!',
                colors.error
            );
            return await message.reply({ embeds: [errorEmbed] });
        }
        
        if (sides > 1000) {
            const errorEmbed = createYakuzaEmbed(
                'Erro',
                'O dado não pode ter mais de 1000 lados!',
                colors.error
            );
            return await message.reply({ embeds: [errorEmbed] });
        }
        
        await performDiceRoll(sides, message, null, colors, createYakuzaEmbed);
    },
    
    async executeSlash(interaction, client, config, colors, createYakuzaEmbed, emojis) {
        const sides = interaction.options.getInteger('lados') || 6;
        await performDiceRoll(sides, null, interaction, colors, createYakuzaEmbed);
    }
};

async function performDiceRoll(sides, message, interaction, colors, createYakuzaEmbed) {
    try {
        const result = Math.floor(Math.random() * sides) + 1;
        
        const diceEmojis = {
            1: '⚀',
            2: '⚁',
            3: '⚂',
            4: '⚃',
            5: '⚄',
            6: '⚅'
        };
        
        const emoji = sides <= 6 ? diceEmojis[result] : '🎲';
        
        let description = `🎲 Rolando um dado de **${sides}** lados...\n\n`;
        description += `${emoji} Resultado: **${result}**`;
        
        if (result === 1) {
            description += '\n\n💀 Azarado!';
        } else if (result === sides) {
            description += '\n\n✨ Número máximo! Sortudo!';
        }
        
        const embed = createYakuzaEmbed(
            `🎲 Dado de ${sides} lados`,
            description,
            colors.primary
        );
        
        if (message) {
            await message.reply({ embeds: [embed] });
        } else {
            await interaction.reply({ embeds: [embed] });
        }
        
    } catch (error) {
        console.error('Erro no comando dado:', error);
        
        const errorEmbed = createYakuzaEmbed(
            'Erro',
            'Ocorreu um erro ao executar este comando.',
            colors.error
        );
        
        if (message) {
            await message.reply({ embeds: [errorEmbed] });
        } else {
            await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }
    }
}
