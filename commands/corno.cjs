const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: 'corno',
    aliases: ['cornometro'],
    description: 'Mede o nível de corno do usuário',
    
    slashData: new SlashCommandBuilder()
        .setName('corno')
        .setDescription('Mede o nível de corno do usuário')
        .addUserOption(option =>
            option.setName('usuário')
                .setDescription('Usuário para medir')
                .setRequired(false)
        ),
    
    async execute(message, args, client, config, colors, createYakuzaEmbed, emojis) {
        const target = message.mentions.users.first() || await client.users.fetch(args[0]).catch(() => null) || message.author;
        await performMeter('corno', message.author, target, message, null, colors, createYakuzaEmbed);
    },
    
    async executeSlash(interaction, client, config, colors, createYakuzaEmbed, emojis) {
        const target = interaction.options.getUser('usuário') || interaction.user;
        await performMeter('corno', interaction.user, target, null, interaction, colors, createYakuzaEmbed);
    }
};

async function performMeter(type, author, target, message, interaction, colors, createYakuzaEmbed) {
    try {
        const percentage = Math.floor(Math.random() * 101);
        
        let description = '';
        let emoji = '🦌';
        
        if (percentage < 20) {
            description = 'Relacionamento seguro! 💑';
            emoji = '💑';
        } else if (percentage < 40) {
            description = 'Tem uns chifrinhos pequenos 🐐';
            emoji = '🐐';
        } else if (percentage < 60) {
            description = 'Médio corno 🦌';
            emoji = '🦌';
        } else if (percentage < 80) {
            description = 'Corno de carteirinha 😭';
            emoji = '😭';
        } else {
            description = 'CORNO MANSO DEMAIS! 🎺';
            emoji = '🎺';
        }
        
        let bar = '';
        const filled = Math.floor(percentage / 10);
        for (let i = 0; i < 10; i++) {
            bar += i < filled ? '🟫' : '⬛';
        }
        
        const embed = createYakuzaEmbed(
            `${emoji} Cornômetro`,
            `**${target.username}** é **${percentage}%** corno!\n\n${bar} ${percentage}%\n\n${description}`,
            colors.primary
        );
        
        if (message) {
            await message.reply({ embeds: [embed] });
        } else {
            await interaction.reply({ embeds: [embed] });
        }
        
    } catch (error) {
        console.error('Erro no comando corno:', error);
        
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
