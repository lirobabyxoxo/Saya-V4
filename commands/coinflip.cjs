const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: 'coinflip',
    aliases: ['moeda', 'flip', 'cf'],
    description: 'Joga uma moeda (cara ou coroa)',
    
    slashData: new SlashCommandBuilder()
        .setName('coinflip')
        .setDescription('Joga uma moeda (cara ou coroa)'),
    
    async execute(message, args, client, config, colors, createYakuzaEmbed, emojis) {
        await performCoinFlip(message, null, colors, createYakuzaEmbed);
    },
    
    async executeSlash(interaction, client, config, colors, createYakuzaEmbed, emojis) {
        await performCoinFlip(null, interaction, colors, createYakuzaEmbed);
    }
};

async function performCoinFlip(message, interaction, colors, createYakuzaEmbed) {
    try {
        const result = Math.random() < 0.5 ? 'cara' : 'coroa';
        
        const emojis = {
            cara: '🪙',
            coroa: '👑'
        };
        
        const messages = {
            cara: [
                'Deu **CARA**! 🪙',
                'A moeda caiu em **CARA**! 🪙',
                '**CARA** venceu! 🪙'
            ],
            coroa: [
                'Deu **COROA**! 👑',
                'A moeda caiu em **COROA**! 👑',
                '**COROA** venceu! 👑'
            ]
        };
        
        const randomMessage = messages[result][Math.floor(Math.random() * messages[result].length)];
        
        const embed = createYakuzaEmbed(
            `${emojis[result]} Coin Flip`,
            `🔄 Girando a moeda...\n\n${randomMessage}`,
            colors.primary
        );
        
        if (message) {
            await message.reply({ embeds: [embed] });
        } else {
            await interaction.reply({ embeds: [embed] });
        }
        
    } catch (error) {
        console.error('Erro no comando coinflip:', error);
        
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
