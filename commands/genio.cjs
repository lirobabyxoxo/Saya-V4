const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: 'genio',
    aliases: ['gênio'],
    description: 'Mede o quão gênio o usuário é',
    
    slashData: new SlashCommandBuilder()
        .setName('genio')
        .setDescription('Mede o quão gênio o usuário é')
        .addUserOption(option =>
            option.setName('usuário')
                .setDescription('Usuário para medir')
                .setRequired(false)
        ),
    
    async execute(message, args, client, config, colors, createYakuzaEmbed, emojis) {
        const target = message.mentions.users.first() || await client.users.fetch(args[0]).catch(() => null) || message.author;
        await performMeter('genio', message.author, target, message, null, colors, createYakuzaEmbed);
    },
    
    async executeSlash(interaction, client, config, colors, createYakuzaEmbed, emojis) {
        const target = interaction.options.getUser('usuário') || interaction.user;
        await performMeter('genio', interaction.user, target, null, interaction, colors, createYakuzaEmbed);
    }
};

async function performMeter(type, author, target, message, interaction, colors, createYakuzaEmbed) {
    try {
        const percentage = Math.floor(Math.random() * 101);
        
        let description = '';
        let emoji = '🧠';
        
        if (percentage < 20) {
            description = 'Burro que nem uma porta 🚪';
            emoji = '🚪';
        } else if (percentage < 40) {
            description = 'Nem tão inteligente assim 😅';
            emoji = '😅';
        } else if (percentage < 60) {
            description = 'Inteligência mediana 😐';
            emoji = '😐';
        } else if (percentage < 80) {
            description = 'Bem inteligente! 🤓';
            emoji = '🤓';
        } else {
            description = 'GÊNIO ABSOLUTO! 🚀';
            emoji = '🚀';
        }
        
        let bar = '';
        const filled = Math.floor(percentage / 10);
        for (let i = 0; i < 10; i++) {
            bar += i < filled ? '🟦' : '⬛';
        }
        
        const embed = createYakuzaEmbed(
            `${emoji} Medidor de Genialidade`,
            `**${target.username}** é **${percentage}%** gênio!\n\n${bar} ${percentage}%\n\n${description}`,
            colors.primary
        );
        
        if (message) {
            await message.reply({ embeds: [embed] });
        } else {
            await interaction.reply({ embeds: [embed] });
        }
        
    } catch (error) {
        console.error('Erro no comando genio:', error);
        
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
