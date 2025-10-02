const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: 'pal',
    aliases: ['amigos'],
    description: 'Mostra quantos amigos verdadeiros o cara teria',
    
    slashData: new SlashCommandBuilder()
        .setName('pal')
        .setDescription('Mostra quantos amigos verdadeiros o cara teria')
        .addUserOption(option =>
            option.setName('usuário')
                .setDescription('Usuário para medir')
                .setRequired(false)
        ),
    
    async execute(message, args, client, config, colors, createYakuzaEmbed, emojis) {
        const target = message.mentions.users.first() || await client.users.fetch(args[0]).catch(() => null) || message.author;
        await performMeter('pal', message.author, target, message, null, colors, createYakuzaEmbed);
    },
    
    async executeSlash(interaction, client, config, colors, createYakuzaEmbed, emojis) {
        const target = interaction.options.getUser('usuário') || interaction.user;
        await performMeter('pal', interaction.user, target, null, interaction, colors, createYakuzaEmbed);
    }
};

async function performMeter(type, author, target, message, interaction, colors, createYakuzaEmbed) {
    try {
        const friends = Math.floor(Math.random() * 21);
        
        let description = '';
        let emoji = '👥';
        
        if (friends === 0) {
            description = 'Solitário completo 😢';
            emoji = '😢';
        } else if (friends < 3) {
            description = 'Pouquíssimos amigos 😔';
            emoji = '😔';
        } else if (friends < 6) {
            description = 'Alguns amigos 😐';
            emoji = '😐';
        } else if (friends < 10) {
            description = 'Vários amigos! 😊';
            emoji = '😊';
        } else if (friends < 15) {
            description = 'Bastante popular! 😎';
            emoji = '😎';
        } else {
            description = 'AMIGÃO DE TODO MUNDO! 🎉';
            emoji = '🎉';
        }
        
        const embed = createYakuzaEmbed(
            `${emoji} Medidor de Amizades`,
            `**${target.username}** teria **${friends}** amigo(s) verdadeiro(s)!\n\n${description}`,
            colors.primary
        );
        
        if (message) {
            await message.reply({ embeds: [embed] });
        } else {
            await interaction.reply({ embeds: [embed] });
        }
        
    } catch (error) {
        console.error('Erro no comando pal:', error);
        
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
