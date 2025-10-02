const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: 'gay',
    aliases: [],
    description: 'Mostra a porcentagem de gay do usuário',
    
    slashData: new SlashCommandBuilder()
        .setName('gay')
        .setDescription('Mostra a porcentagem de gay do usuário')
        .addUserOption(option =>
            option.setName('usuário')
                .setDescription('Usuário para medir')
                .setRequired(false)
        ),
    
    async execute(message, args, client, config, colors, createYakuzaEmbed, emojis) {
        const target = message.mentions.users.first() || await client.users.fetch(args[0]).catch(() => null) || message.author;
        await performMeter('gay', message.author, target, message, null, colors, createYakuzaEmbed);
    },
    
    async executeSlash(interaction, client, config, colors, createYakuzaEmbed, emojis) {
        const target = interaction.options.getUser('usuário') || interaction.user;
        await performMeter('gay', interaction.user, target, null, interaction, colors, createYakuzaEmbed);
    }
};

async function performMeter(type, author, target, message, interaction, colors, createYakuzaEmbed) {
    try {
        const percentage = Math.floor(Math.random() * 101);
        
        let bar = '';
        const filled = Math.floor(percentage / 10);
        for (let i = 0; i < 10; i++) {
            bar += i < filled ? '🟪' : '⬛';
        }
        
        const embed = createYakuzaEmbed(
            '🏳️‍🌈 Medidor de Gay',
            `**${target.username}** é **${percentage}%** gay!\n\n${bar} ${percentage}%`,
            colors.primary
        );
        
        if (message) {
            await message.reply({ embeds: [embed] });
        } else {
            await interaction.reply({ embeds: [embed] });
        }
        
    } catch (error) {
        console.error('Erro no comando gay:', error);
        
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
