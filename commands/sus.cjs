const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: 'sus',
    aliases: ['suspeito'],
    description: 'Mede o quanto o usuário é suspeito',
    
    slashData: new SlashCommandBuilder()
        .setName('sus')
        .setDescription('Mede o quanto o usuário é suspeito')
        .addUserOption(option =>
            option.setName('usuário')
                .setDescription('Usuário para medir')
                .setRequired(false)
        ),
    
    async execute(message, args, client, config, colors, createYakuzaEmbed, emojis) {
        const target = message.mentions.users.first() || await client.users.fetch(args[0]).catch(() => null) || message.author;
        await performMeter('sus', message.author, target, message, null, colors, createYakuzaEmbed);
    },
    
    async executeSlash(interaction, client, config, colors, createYakuzaEmbed, emojis) {
        const target = interaction.options.getUser('usuário') || interaction.user;
        await performMeter('sus', interaction.user, target, null, interaction, colors, createYakuzaEmbed);
    }
};

async function performMeter(type, author, target, message, interaction, colors, createYakuzaEmbed) {
    try {
        const percentage = Math.floor(Math.random() * 101);
        
        let description = '';
        let emoji = '😐';
        
        if (percentage < 20) {
            description = 'Confiável! 😇';
            emoji = '😇';
        } else if (percentage < 40) {
            description = 'Pouco suspeito 👍';
            emoji = '👍';
        } else if (percentage < 60) {
            description = 'Levemente suspeito 🤨';
            emoji = '🤨';
        } else if (percentage < 80) {
            description = 'Bastante suspeito 😬';
            emoji = '😬';
        } else {
            description = 'EXTREMAMENTE SUSPEITO! 🚨';
            emoji = '🚨';
        }
        
        let bar = '';
        const filled = Math.floor(percentage / 10);
        for (let i = 0; i < 10; i++) {
            bar += i < filled ? '🟥' : '⬛';
        }
        
        const embed = createYakuzaEmbed(
            `${emoji} Medidor de Suspeição`,
            `**${target.username}** é **${percentage}%** suspeito!\n\n${bar} ${percentage}%\n\n${description}`,
            colors.primary
        );
        
        if (message) {
            await message.reply({ embeds: [embed] });
        } else {
            await interaction.reply({ embeds: [embed] });
        }
        
    } catch (error) {
        console.error('Erro no comando sus:', error);
        
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
